import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { IconButton } from './icon-button'

const meta = {
  component: IconButton,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['round', 'pill'], description: 'Форма кнопки' },
    children: { control: 'text', description: 'Содержимое (иконка)' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
    onClick: { action: 'clicked' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Round: Story = {
  args: { variant: 'round', children: '★', 'aria-label': 'Избранное' },
}

export const Pill: Story = {
  args: { variant: 'pill', children: '★ Избранное' },
}

export const Disabled: Story = {
  args: { variant: 'round', children: '★', 'aria-label': 'Избранное', disabled: true },
}

export const PillDisabled: Story = {
  args: { variant: 'pill', children: '★ Избранное', disabled: true },
}
