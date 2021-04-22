// .storybook/main.js
const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/preset-scss",
      options: {
        rule: {
          include: path.resolve(__dirname, "../src"),
        },
        cssLoaderOptions: {
          modules: true,
        },
      },
      sassLoaderOptions: {
        webpackImporter: false,
      },
    },
    "@storybook/addon-postcss",
  ],
};
