import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Radio } from './radio'

const meta = {
  component: Radio,
  parameters: { layout: 'centered' },
  argTypes: {
    name: { control: 'text', description: 'Имя группы' },
    value: { control: 'text', description: 'Значение' },
    checked: { control: 'boolean', description: 'Выбран ли' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    children: { control: 'text', description: 'Подпись' },
    onChange: { action: 'changed' },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'color', value: 'red', children: 'Красный' },
}

export const Checked: Story = {
  args: { name: 'color', value: 'red', children: 'Красный', checked: true },
}

export const Disabled: Story = {
  args: { name: 'color', value: 'red', children: 'Красный', disabled: true },
}

export const CheckedDisabled: Story = {
  args: { name: 'color', value: 'red', children: 'Красный', checked: true, disabled: true },
}

export const LongLabel: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: { name: 'color', value: 'red', children: 'Очень длинная подпись для радиокнопки '.repeat(5) },
}
