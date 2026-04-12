import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from './heading'

const meta = {
  component: Heading,
  parameters: { layout: 'centered' },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Уровень заголовка (h1–h6)',
    },
    children: { control: 'text', description: 'Содержимое заголовка' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: { level: 1, children: 'Заголовок H1' },
}

export const H2: Story = {
  args: { level: 2, children: 'Заголовок H2' },
}

export const H3: Story = {
  args: { level: 3, children: 'Заголовок H3' },
}

export const H4: Story = {
  args: { level: 4, children: 'Заголовок H4' },
}

export const H5: Story = {
  args: { level: 5, children: 'Заголовок H5' },
}

export const H6: Story = {
  args: { level: 6, children: 'Заголовок H6' },
}

export const Overflow: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
  args: { level: 1, children: 'Длинный заголовок '.repeat(10) },
}
