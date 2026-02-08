import type { StorybookConfig } from '@storybook/react-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  viteFinal(config) {
    config.plugins ??= []
    config.plugins.unshift(
      vanillaExtractPlugin(),
      svgr({
        exportAsDefault: true,
      }),
    )
    return config
  },
}
export default config
