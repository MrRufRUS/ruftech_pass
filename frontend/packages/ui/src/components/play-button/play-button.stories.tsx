import type { Meta, StoryObj } from '@storybook/react-vite'
import { Play } from '@ruftech/icons'
import { fn } from 'storybook/test'
import { PlayButton } from './play-button'

const meta = {
  component: PlayButton,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { description: 'Содержимое (иконка)' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    onClick: { action: 'clicked' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof PlayButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: <Play width={48} height={48} />, 'aria-label': 'Воспроизвести' },
}

export const Disabled: Story = {
  args: { children: <Play width={48} height={48} />, 'aria-label': 'Воспроизвести', disabled: true },
}
