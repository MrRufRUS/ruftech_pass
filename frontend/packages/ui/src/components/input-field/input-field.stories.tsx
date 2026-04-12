import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputField } from './input-field'

const meta = {
  component: InputField,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text', description: 'Подпись поля (для скринридера)' },
    name: { control: 'text', description: 'Имя поля ввода' },
    placeholder: { control: 'text', description: 'Текст-заполнитель' },
    error: { control: 'boolean', description: 'Состояние ошибки' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    autocomplete: { control: 'text', description: 'Тип автозаполнения' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Email', name: 'email', placeholder: 'Введите email' },
}

export const Error: Story = {
  args: { label: 'Email', name: 'email', placeholder: 'Введите email', error: true },
}

export const Disabled: Story = {
  args: { label: 'Email', name: 'email', placeholder: 'Введите email', disabled: true },
}

export const ErrorDisabled: Story = {
  args: { label: 'Email', name: 'email', placeholder: 'Введите email', error: true, disabled: true },
}

export const LongPlaceholder: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250 }}>
        <Story />
      </div>
    ),
  ],
  args: { label: 'Email', name: 'email', placeholder: 'Очень длинный текст заполнителя '.repeat(5) },
}

export const WithAutocomplete: Story = {
  args: { label: 'Email', name: 'email', placeholder: 'Введите email', autocomplete: 'email' },
}

export const EmailType: Story = {
  args: { label: 'Email', name: 'email', placeholder: 'user@example.com', type: 'email', autocomplete: 'email' },
}

export const PhoneType: Story = {
  args: { label: 'Телефон', name: 'phone', placeholder: '+7 (999) 123-45-67', type: 'tel', autocomplete: 'tel' },
}

export const PhoneMask: Story = {
  args: { label: 'Телефон', name: 'phone', placeholder: '+7 (___) ___-__-__', type: 'tel', mask: 'phone' },
}

export const CustomMask: Story = {
  args: { label: 'Дата', name: 'date', placeholder: '__/__/____', mask: '__/__/____' },
}

export const NameField: Story = {
  args: { label: 'Имя', name: 'name', placeholder: 'Введите имя', autocomplete: 'name' },
}
