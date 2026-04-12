import type { Meta, StoryObj } from '@storybook/react-vite'
import { Check, Link, Telegram, Twitter } from '@ruftech/icons'
import { fn } from 'storybook/test'
import { ShareLinkButton } from '../share-link-button'
import { SharePanel } from './share-panel'

const meta = {
  component: SharePanel,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { description: 'Содержимое панели' },
  },
} satisfies Meta<typeof SharePanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <ShareLinkButton
          defaultIcon={<Telegram width={18} height={18} />}
          confirmedIcon={<Check width={18} height={18} />}
          aria-label="Telegram"
          onShare={fn()}
        />
        <ShareLinkButton
          defaultIcon={<Twitter width={18} height={18} />}
          confirmedIcon={<Check width={18} height={18} />}
          aria-label="Twitter"
          onShare={fn()}
        />
        <ShareLinkButton
          defaultIcon={<Link width={18} height={18} />}
          confirmedIcon={<Check width={18} height={18} />}
          aria-label="Скопировать ссылку"
          onShare={fn()}
        />
      </>
    ),
  },
}
