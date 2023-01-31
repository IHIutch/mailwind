module.exports = {
  pluginSearchDirs: false,
  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    require('prettier-plugin-tailwindcss'),
  ],
  semi: false,
  singleQuote: true,
  //
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
