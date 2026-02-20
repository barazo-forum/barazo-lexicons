import baseConfig from '../eslint.config.base.js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['tests/*.ts', 'tests/fixtures/*.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { ignores: ['src/generated/**'] }
)
