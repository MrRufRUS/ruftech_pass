import { defineConfig } from 'eslint/config'
import reactConfig from '@ruftech/eslint-config/react.js'

export default defineConfig(
  { ignores: ['.storybook/'] },
  reactConfig,
  { languageOptions: { parserOptions: { project: true } } },
)
