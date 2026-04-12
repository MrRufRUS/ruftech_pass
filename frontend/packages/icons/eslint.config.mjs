import { defineConfig } from 'eslint/config'
import reactConfig from '@ruftech/eslint-config/react.js'

export default defineConfig(
  reactConfig,
  { languageOptions: { parserOptions: { project: true } } },
)
