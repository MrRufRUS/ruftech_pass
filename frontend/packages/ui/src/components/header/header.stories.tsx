import type { Meta, StoryObj } from '@storybook/react-vite'
import { LanguageSwitcher } from '../language-switcher'
import { Logo } from '../logo'
import { Header } from './header'

const meta = {
  component: Header,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    children: { description: 'Содержимое шапки' },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Logo width={120} />
        <LanguageSwitcher
          locales={[
            { code: 'ru', href: '/' },
            { code: 'en', href: '/en/' },
          ]}
          currentLocale="ru"
        />
      </>
    ),
  },
}
