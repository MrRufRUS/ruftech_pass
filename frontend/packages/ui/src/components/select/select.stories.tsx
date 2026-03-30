import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Select } from './select'

const meta = {
  component: Select,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text', description: 'Подпись (для скринридера)' },
    name: { control: 'text', description: 'Имя поля' },
    options: { control: 'object', description: 'Список опций' },
    value: { control: 'text', description: 'Выбранное значение' },
    placeholder: { control: 'text', description: 'Текст-заполнитель' },
    error: { control: 'boolean', description: 'Состояние ошибки' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    onChange: { action: 'changed' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
  args: { onChange: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { label: 'Москва', value: 'msk' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Новосибирск', value: 'nsk' },
]

export const Default: Story = {
  args: {
    label: 'Город',
    name: 'city',
    options: defaultOptions,
  },
}

export const WithValue: Story = {
  args: {
    label: 'Город',
    name: 'city',
    options: defaultOptions,
    value: 'spb',
  },
}

export const Error: Story = {
  args: {
    label: 'Город',
    name: 'city',
    options: defaultOptions,
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Город',
    name: 'city',
    options: defaultOptions,
    value: 'msk',
    disabled: true,
  },
}

export const ManyOptions: Story = {
  args: {
    label: 'Страна',
    name: 'country',
    options: Array.from({ length: 15 }, (_, i) => ({
      label: `Страна ${i + 1}`,
      value: `country-${i + 1}`,
    })),
  },
}

export const LongOptionLabels: Story = {
  args: {
    label: 'Категория',
    name: 'category',
    options: [
      { label: 'Очень длинное название первой категории '.repeat(2), value: 'cat-1' },
      { label: 'Очень длинное название второй категории '.repeat(2), value: 'cat-2' },
      { label: 'Очень длинное название третьей категории '.repeat(2), value: 'cat-3' },
    ],
  },
}

export const CustomPlaceholder: Story = {
  args: {
    label: 'Роль',
    name: 'role',
    options: defaultOptions,
    placeholder: 'Выберите роль пользователя...',
  },
}
