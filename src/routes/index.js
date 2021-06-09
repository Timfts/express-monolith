const { Router } = require("express");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const webpack = require("webpack");

function getRoutes() {
  const appRouter = Router();

  appRouter.get("*", async (req, res) => {
    const pagesFolder = path.resolve(__dirname, "../ui/pages");
    const aboutPageFolder = `${pagesFolder}/about/index.json`;
    const componentRootContent = fs.readFileSync(aboutPageFolder, {
      encoding: "utf-8",
    });
    const { template, style, script } = JSON.parse(componentRootContent);
    const templatePath = path.resolve(`${pagesFolder}/about`, template);
    const scriptPath = path.resolve(`${pagesFolder}/about`, script);
    const templateFileContent = fs.readFileSync(templatePath, {
      encoding: "utf-8",
    });

    const compiler = webpack({
      mode: "development",
      entry: scriptPath,
      output: {
        filename: "main.js",
        path: process.cwd() + "/src/public/.cache",
      },
    });

    compiler.run(() => {
      console.log(__dirname);
      res
        .status(200)
        .set({ "Content-Type": "text/html" })
        .end(templateFileContent);
    });
  });

  return appRouter;
}

module.exports = getRoutes;
