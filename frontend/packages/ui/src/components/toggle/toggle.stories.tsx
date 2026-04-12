import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Toggle } from './toggle'

const meta = {
  component: Toggle,
  parameters: { layout: 'centered' },
  argTypes: {
    name: { control: 'text', description: 'Имя поля' },
    checked: { control: 'boolean', description: 'Включён ли' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    labelPosition: { control: 'select', options: ['before', 'after'], description: 'Положение подписи' },
    variant: { control: 'select', options: ['light', 'dark'], description: 'Визуальный вариант' },
    children: { control: 'text', description: 'Подпись' },
    onChange: { action: 'changed' },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: { name: 'theme', variant: 'light', children: 'Тёмная тема' },
}

export const Dark: Story = {
  args: { name: 'theme', variant: 'dark', children: 'Тёмная тема' },
}

export const LabelBefore: Story = {
  args: { name: 'notifications', labelPosition: 'before', children: 'Уведомления' },
}

export const Disabled: Story = {
  args: { name: 'theme', variant: 'light', disabled: true, children: 'Тёмная тема' },
}

export const CheckedDisabled: Story = {
  args: { name: 'theme', variant: 'light', checked: true, disabled: true, children: 'Тёмная тема' },
}

export const LongLabel: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250 }}>
        <Story />
      </div>
    ),
  ],
  args: { name: 'setting', children: 'Очень длинная подпись переключателя '.repeat(5) },
}

export const DarkLabelBefore: Story = {
  args: { name: 'theme', variant: 'dark', labelPosition: 'before', children: 'Тёмная тема' },
}

export const NoLabel: Story = {
  args: { name: 'silent', variant: 'light' },
}
