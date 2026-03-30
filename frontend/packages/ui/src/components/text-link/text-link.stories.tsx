import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextLink } from './text-link'

const meta = {
  component: TextLink,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { control: 'text', description: 'Текст ссылки' },
    href: { control: 'text', description: 'URL ссылки' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Текстовая ссылка', href: '#' },
}

export const Overflow: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: { children: 'Очень длинная текстовая ссылка '.repeat(5), href: '#' },
}
