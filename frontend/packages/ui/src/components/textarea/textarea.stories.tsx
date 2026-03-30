import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './textarea'

const meta = {
  component: Textarea,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text', description: 'Подпись поля (для скринридера)' },
    name: { control: 'text', description: 'Имя поля' },
    placeholder: { control: 'text', description: 'Текст-заполнитель' },
    error: { control: 'boolean', description: 'Состояние ошибки' },
    disabled: { control: 'boolean', description: 'Неактивное состояние' },
    rows: { control: 'number', description: 'Количество строк' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    'aria-invalid': { control: 'boolean', description: 'Невалидное значение (a11y)' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Сообщение', name: 'message', placeholder: 'Введите сообщение' },
}

export const Error: Story = {
  args: { label: 'Сообщение', name: 'message', placeholder: 'Введите сообщение', error: true },
}

export const Disabled: Story = {
  args: { label: 'Сообщение', name: 'message', placeholder: 'Введите сообщение', disabled: true },
}

export const ErrorDisabled: Story = {
  args: { label: 'Сообщение', name: 'message', placeholder: 'Введите сообщение', error: true, disabled: true },
}

export const CustomRows: Story = {
  args: { label: 'Описание', name: 'description', placeholder: 'Введите описание', rows: 8 },
}

export const LongPlaceholder: Story = {
  args: {
    label: 'Комментарий',
    name: 'comment',
    placeholder: 'Очень длинный текст заполнителя для проверки переноса '.repeat(3),
  },
}
