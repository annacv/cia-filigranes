// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/multi-word-component-names": "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    "vue/html-indent": ["error", 2],
    "vue/script-indent": ["error", 2, { baseIndent: 0 }],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
  },
});