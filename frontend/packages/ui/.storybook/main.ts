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
    config.server ??= {}
    config.server.proxy ??= {}
    config.server.proxy['/api'] = {
      target: 'http://localhost:8000',
      changeOrigin: true,
    }
    config.server.proxy['/v1'] = {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/v1/, '/api/v1'),
    }
    return config
  },
}
export default config
