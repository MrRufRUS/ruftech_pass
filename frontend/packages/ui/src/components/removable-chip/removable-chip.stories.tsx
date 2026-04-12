import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { RemovableChip } from './removable-chip'

const meta = {
  component: RemovableChip,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text', description: 'Текст чипа' },
    value: { control: 'text', description: 'Значение чипа' },
    removeLabel: { control: 'text', description: 'Подпись кнопки удаления (a11y)' },
    onRemove: { action: 'removed' },
  },
  args: { onRemove: fn() },
} satisfies Meta<typeof RemovableChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'react' },
}

export const LongLabel: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: { label: 'длинный чип '.repeat(5) },
}

export const WithCustomRemoveLabel: Story = {
  args: { label: 'typescript', removeLabel: 'Удалить тег typescript' },
}

export const WithValue: Story = {
  args: { label: 'React', value: 'react' },
}
