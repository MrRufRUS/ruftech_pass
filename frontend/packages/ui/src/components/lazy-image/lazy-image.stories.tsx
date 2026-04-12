import type { Meta, StoryObj } from '@storybook/react-vite'
import { LazyImage } from './lazy-image'

const meta = {
  component: LazyImage,
  parameters: { layout: 'centered' },
  argTypes: {
    src: { control: 'text', description: 'URL изображения' },
    alt: { control: 'text', description: 'Альтернативный текст' },
  },
} satisfies Meta<typeof LazyImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { src: 'https://placehold.co/300x200', alt: 'Пример изображения' },
}

export const CustomSize: Story = {
  args: { src: 'https://placehold.co/600x100', alt: 'Широкое изображение', width: 600, height: 100 },
}

export const SmallSquare: Story = {
  args: { src: 'https://placehold.co/80x80', alt: 'Маленькое квадратное изображение', width: 80, height: 80 },
}
