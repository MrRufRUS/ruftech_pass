import type { Meta, StoryObj } from '@storybook/react-vite'
import { Check, Link } from '@ruftech/icons'
import { fn } from 'storybook/test'
import { ShareLinkButton } from './share-link-button'

const meta = {
  component: ShareLinkButton,
  parameters: { layout: 'centered' },
  argTypes: {
    'aria-label': { control: 'text', description: 'Доступное имя' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    onShare: { action: 'shared' },
  },
  args: { onShare: fn() },
} satisfies Meta<typeof ShareLinkButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultIcon: <Link width={18} height={18} />,
    confirmedIcon: <Check width={18} height={18} />,
    'aria-label': 'Скопировать ссылку',
  },
}

export const Disabled: Story = {
  args: {
    defaultIcon: <Link width={18} height={18} />,
    confirmedIcon: <Check width={18} height={18} />,
    'aria-label': 'Скопировать ссылку',
    disabled: true,
  },
}
