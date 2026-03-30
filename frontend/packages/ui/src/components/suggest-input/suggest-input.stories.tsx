import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { SuggestInput } from './suggest-input'

const meta = {
  component: SuggestInput,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text', description: 'Подпись (для скринридера)' },
    name: { control: 'text', description: 'Имя поля' },
    placeholder: { control: 'text', description: 'Текст-заполнитель' },
    suggestions: { control: 'object', description: 'Список подсказок' },
    value: { control: 'text', description: 'Текущее значение' },
    error: { control: 'boolean', description: 'Состояние ошибки' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    emptyMessage: { control: 'text', description: 'Сообщение при пустом результате' },
    onChange: { action: 'changed' },
    onSelect: { action: 'selected' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
  args: { onChange: fn(), onSelect: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SuggestInput>

export default meta
type Story = StoryObj<typeof meta>

const cities = [
  { label: 'Москва', value: 'msk' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Новосибирск', value: 'nsk' },
  { label: 'Екатеринбург', value: 'ekb' },
  { label: 'Казань', value: 'kzn' },
  { label: 'Нижний Новгород', value: 'nnov' },
]

export const Default: Story = {
  args: {
    label: 'Город',
    name: 'city',
    placeholder: 'Введите город',
    suggestions: cities,
  },
}

export const Error: Story = {
  args: {
    label: 'Город',
    name: 'city',
    placeholder: 'Введите город',
    suggestions: cities,
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Город',
    name: 'city',
    placeholder: 'Введите город',
    suggestions: cities,
    disabled: true,
  },
}

export const ManySuggestions: Story = {
  args: {
    label: 'Страна',
    name: 'country',
    placeholder: 'Введите страну',
    suggestions: Array.from({ length: 20 }, (_, i) => ({
      label: `Страна ${i + 1}`,
      value: `country-${i + 1}`,
    })),
  },
}

export const LongLabels: Story = {
  args: {
    label: 'Адрес',
    name: 'address',
    placeholder: 'Введите адрес',
    suggestions: [
      { label: 'Очень длинный адрес первого варианта подсказки '.repeat(2), value: 'addr-1' },
      { label: 'Очень длинный адрес второго варианта подсказки '.repeat(2), value: 'addr-2' },
    ],
  },
}

export const CustomEmptyMessage: Story = {
  args: {
    label: 'Город',
    name: 'city',
    placeholder: 'Введите город',
    suggestions: [],
    emptyMessage: 'Город не найден в списке',
  },
}
