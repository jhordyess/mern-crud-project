import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type { import("eslint").Linter.Config[] } */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.node
      // ecmaVersion:"latest", // not required as it is the default
      // sourceType: 'module' // not required?
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
