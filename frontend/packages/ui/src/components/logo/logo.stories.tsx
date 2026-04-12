import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './logo'

const meta = {
  component: Logo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const LogoStory: Story = {
  args: {},
}

export const Small: Story = {
  args: { width: 50 },
}

export const Large: Story = {
  args: { width: 300 },
}
