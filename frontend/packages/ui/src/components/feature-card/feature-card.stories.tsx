import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeatureCard } from './feature-card'

const meta = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Иконка функции',
    },
    title: {
      description: 'Заголовок карточки',
      control: 'text',
    },
    description: {
      description: 'Описание функции',
      control: 'text',
    },
    className: {
      description: 'CSS-класс',
      control: 'text',
    },
    'aria-label': {
      description: 'Метка для скринридеров',
      control: 'text',
    },
    tabIndex: {
      description: 'Порядок табуляции',
      control: 'number',
    },
  },
} satisfies Meta<typeof FeatureCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Локальное хранение',
    description: 'Ваши данные остаются на вашем устройстве. Никакие серверы не хранят ваши пароли.',
  },
}
