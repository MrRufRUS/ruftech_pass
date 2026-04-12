import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Tag } from './tag'

const meta = {
  component: Tag,
  parameters: { layout: 'centered' },
  argTypes: {
    tag: { control: 'text', description: 'Текст тега' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
    onClick: { action: 'clicked' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { tag: 'react' },
}

export const LongTag: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 150 }}>
        <Story />
      </div>
    ),
  ],
  args: { tag: 'длинный-тег-'.repeat(5) },
}

export const Disabled: Story = {
  args: { tag: 'react', disabled: true },
}
