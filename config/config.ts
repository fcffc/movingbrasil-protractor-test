import * as path from "path";
import { browser, Config } from "protractor";
import { Reporter } from "../support/reporter";
const jsonReports = process.cwd() + "/reports/json";

const specs: string[] = [];
if (process.env.SPECS) {
    specs.push("../../features/" + process.env.SPECS + ".feature");
} else {
    specs.push("../../features/*.feature");
}

export const config: Config = {

    seleniumAddress: (process.env.SELENIUM_ADDRESS || 'http://localhost:4444/wd/hub'),

    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: (process.env.BASE_URL || 'http://www.google.com/'),

    capabilities: {
        browserName: (process.env.TEST_BROWSER_NAME || 'chrome'),
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: specs,

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        Reporter.createDirectory(jsonReports);
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: ["../../stepdefinitions/*.ts", "../../support/*.ts"],
        strict: true,
        tags: "@TypeScriptScenario or @CucumberScenario or @ProtractorScenario",
    },

    onComplete: () => {
        Reporter.createHTMLReport();
    },
};


console.log('------------------------------------------------------');
console.log('BASE_URL: ' + config.baseUrl);
console.log('TEST_BROWSER_NAME: ' + config.capabilities.browserName);
console.log('SELENIUM_ADDRESS: ' + config.seleniumAddress);
console.log('SPECS: ' + config.specs);
console.log('------------------------------------------------------');

