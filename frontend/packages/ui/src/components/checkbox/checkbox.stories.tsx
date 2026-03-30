import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Checkbox } from './checkbox'

const meta = {
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    name: { control: 'text', description: 'Имя поля' },
    checked: { control: 'boolean', description: 'Состояние чекбокса' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    children: { control: 'text', description: 'Подпись чекбокса' },
    onChange: { action: 'changed' },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'agree', children: 'Согласен с условиями' },
}

export const Checked: Story = {
  args: { name: 'agree', children: 'Согласен с условиями', checked: true },
}

export const Disabled: Story = {
  args: { name: 'agree', children: 'Согласен с условиями', disabled: true },
}

export const CheckedDisabled: Story = {
  args: { name: 'agree', children: 'Согласен с условиями', checked: true, disabled: true },
}

export const LongLabel: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: { name: 'agree', children: 'Длинная подпись чекбокса '.repeat(5) },
}
