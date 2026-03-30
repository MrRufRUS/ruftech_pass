import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './spinner'

const meta = {
  component: Spinner,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Размер спиннера',
    },
    variant: {
      control: 'select',
      options: ['primary', 'text', 'success'],
      description: 'Цветовой вариант',
    },
    label: { control: 'text', description: 'Текст загрузки' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: { label: 'Загрузка...' },
}

export const ExtraSmall: Story = {
  args: { size: 'xs' },
}

export const Small: Story = {
  args: { size: 'sm' },
}

export const Large: Story = {
  args: { size: 'lg' },
}

export const ExtraLarge: Story = {
  args: { size: 'xl' },
}

export const Success: Story = {
  args: { variant: 'success', label: 'Сохранение...' },
}

export const Text: Story = {
  args: { variant: 'text' },
}

export const LongLabel: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: { label: 'Идёт загрузка данных, пожалуйста подождите '.repeat(3) },
}
