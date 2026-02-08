import { useEffect } from 'react'
import type { Preview } from '@storybook/react-vite'
import '@ruftech/fonts'
import '@ruftech/tokens'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'auto', title: 'Auto' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'auto',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as string
      useEffect(() => {
        const root = document.documentElement
        if (!theme || theme === 'auto') {
          root.removeAttribute('data-theme')
        } else {
          root.dataset.theme = theme
        }
        return () => root.removeAttribute('data-theme')
      }, [theme])
      return Story()
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
