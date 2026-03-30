import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComboboxOption } from './combobox-option'

const meta = {
  component: ComboboxOption,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text', description: 'Текст опции' },
    value: { control: 'text', description: 'Значение опции' },
    selected: { control: 'boolean', description: 'Выбрана ли опция' },
  },
  decorators: [(Story) => (
    <div role="listbox" style={{ width: 200 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof ComboboxOption>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Опция 1' },
}

export const Selected: Story = {
  args: { label: 'Выбранная опция', selected: true },
}

export const LongLabel: Story = {
  args: { label: 'Очень длинное название опции для проверки переноса текста '.repeat(3) },
}

export const WithValue: Story = {
  args: { label: 'Отображаемое имя', value: 'internal-id-123' },
}
