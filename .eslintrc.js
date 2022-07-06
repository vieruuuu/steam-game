module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
    "./.eslintrc-auto-import.json",
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {
    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
  },
};
