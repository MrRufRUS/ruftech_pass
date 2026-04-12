const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const stylistic = require("@stylistic/eslint-plugin");
const globals = require("globals");

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: "single",
    semi: false,
    jsx: true,
    arrowParens: true,
    braceStyle: "1tbs",
    commaDangle: "always-multiline",
    quoteProps: "as-needed",
  }),
  { languageOptions: { globals: globals.node } },
  { rules: { "@typescript-eslint/no-non-null-assertion": "off" } },
];
