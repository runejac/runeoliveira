// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro, *.ts',
      options: {
        parser: 'astro',
      },
    },
  ],
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
};
