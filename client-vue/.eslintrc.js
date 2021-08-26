// eslint-disable-next-line no-undef
module.exports = {
   root: true,
   extends: [
      // add more generic rulesets here, such as:
   ],
   rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'warning',
      indent: ["error", 3],
   },
   overrides: [
      {
         parser: "@typescript-eslint/parser",
         plugins: [
            "@typescript-eslint"
         ],
         files: ["*.ts", "*.js"],
         extends: [],
         rules: {
         },
      },
      {
         files: ['*.vue'],
         extends: [
            'plugin:vue/essential',
            'plugin:vue/vue3-recommended',
            '@vue/typescript'
         ],
         rules: {
         },
      }
   ]
};