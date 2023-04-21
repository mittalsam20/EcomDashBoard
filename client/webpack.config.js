const path = require("path");

module.exports = {
  // ...
  resolve: {
    alias: {
      state: path.resolve(__dirname, "src/state"),
      constants: path.resolve(__dirname, "src/constants"),
      UIComponents: path.resolve(__dirname, "src/UIComponents"),
      AppComponents: path.resolve(__dirname, "src/AppComponents"),
      Hooks: path.resolve(__dirname, "src/Hooks"),
      pdfTemplates: path.resolve(__dirname, "src/pdfTemplates"),
      apiFunctions: path.resolve(__dirname, "src/apiFunctions"),
    },
  },
};
