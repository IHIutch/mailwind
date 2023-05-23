module.exports = {
  semi: false,
  singleQuote: true,
  //
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^[@/]',
    '^[./]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
}
