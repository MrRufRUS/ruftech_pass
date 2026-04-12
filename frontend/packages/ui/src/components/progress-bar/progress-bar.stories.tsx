import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './progress-bar'

const meta = {
  component: ProgressBar,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: 'number', description: 'Текущее значение' },
    max: { control: 'number', description: 'Максимальное значение' },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
      description: 'Цветовой вариант',
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Размер полосы' },
    label: { control: 'text', description: 'Подпись' },
    showPercentage: { control: 'boolean', description: 'Показывать процент' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 60 },
}

export const WithLabel: Story = {
  args: { value: 45, label: 'Загрузка файлов', showPercentage: true },
}

export const Success: Story = {
  args: { value: 100, variant: 'success', label: 'Завершено', showPercentage: true },
}

export const Warning: Story = {
  args: { value: 80, variant: 'warning', label: 'Почти заполнено', showPercentage: true },
}

export const Error: Story = {
  args: { value: 95, variant: 'error', label: 'Критический уровень', showPercentage: true },
}

export const Small: Story = {
  args: { value: 30, size: 'sm' },
}

export const Large: Story = {
  args: { value: 70, size: 'lg' },
}

export const Zero: Story = {
  args: { value: 0, showPercentage: true },
}

export const Full: Story = {
  args: { value: 100, variant: 'success', showPercentage: true },
}

export const CustomMax: Story = {
  args: { value: 3, max: 5, label: 'Шаг 3 из 5', showPercentage: true },
}
