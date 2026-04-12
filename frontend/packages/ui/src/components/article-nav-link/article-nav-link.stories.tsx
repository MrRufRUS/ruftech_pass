import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArticleNavLink } from './article-nav-link'

const meta = {
  component: ArticleNavLink,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['back', 'forward'], description: 'Направление навигации' },
    href: { control: 'text', description: 'URL ссылки' },
    title: { control: 'text', description: 'Название статьи' },
    directionLabel: { control: 'text', description: 'Подпись направления' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
} satisfies Meta<typeof ArticleNavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Back: Story = {
  args: { variant: 'back', href: '#', title: 'Руководство по React 19' },
}

export const Forward: Story = {
  args: { variant: 'forward', href: '#', title: 'Введение в TypeScript' },
}

export const CustomLabel: Story = {
  args: { variant: 'back', href: '#', title: 'Руководство по React 19', directionLabel: '← Назад' },
}

export const OverflowBack: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: 'back', href: '#', title: 'Очень длинное название предыдущей статьи '.repeat(5) },
}

export const OverflowForward: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: 'forward', href: '#', title: 'Очень длинное название следующей статьи '.repeat(5) },
}
