import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";
import fs from "fs";
import path from "path";

let browserInfo = { name: "unknown", version: "unknown" };

export default defineConfig({
  e2e: {
        baseUrl: "https://homolog.abnmo.ipecode.com.br",
    setupNodeEvents(on, config) {
      allureWriter(on, config);

      on("task", {
        setBrowserInfo(browser: { name: string; version: string; majorVersion?: string }) {
          browserInfo = {
            name: browser.name,
            version: browser.version || browser.majorVersion || "unknown",
          };
          return null;
        },
      });

      on("after:run", () => {
        const allureResults = path.join(__dirname, "./allure-results");
        if (!fs.existsSync(allureResults)) fs.mkdirSync(allureResults, { recursive: true });

        const content = `
          Browser=${browserInfo.name}
          Browser.Version=${browserInfo.version}
          Node.Version=${process.version}
          Cypress.Version=${config.version}
          BaseUrl=${config.baseUrl}
          Ambiente=${config.env?.ENV || "local"}
          `.trim();

        fs.writeFileSync(path.join(allureResults, "environment.properties"), content);
      });

      return config;
    },
  },
  env: { allure: true },
});