import type { Meta, StoryObj } from '@storybook/react-vite'
import { LanguageSwitcher } from './language-switcher'

const meta = {
  component: LanguageSwitcher,
  parameters: { layout: 'centered' },
  argTypes: {
    locales: { control: 'object', description: 'Список локалей' },
    currentLocale: { control: 'text', description: 'Текущая локаль' },
  },
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locales: [
      { code: 'ru', href: '/' },
      { code: 'en', href: '/en/' },
    ],
    currentLocale: 'ru',
  },
}

export const ManyLocales: Story = {
  args: {
    locales: [
      { code: 'ru', href: '/' },
      { code: 'en', href: '/en/' },
      { code: 'de', href: '/de/' },
      { code: 'fr', href: '/fr/' },
      { code: 'es', href: '/es/' },
      { code: 'ja', href: '/ja/' },
      { code: 'zh', href: '/zh/' },
    ],
    currentLocale: 'ru',
  },
}
