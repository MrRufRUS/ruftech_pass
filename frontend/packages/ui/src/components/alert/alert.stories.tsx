import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Alert } from './alert'

const meta = {
  component: Alert,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Вариант оповещения',
    },
    dismissible: { control: 'boolean', description: 'Возможность закрытия' },
    toast: { control: 'boolean', description: 'Режим уведомления с анимацией' },
    autoDismissMs: { control: 'number', description: 'Автоматическое закрытие (мс)' },
    children: { control: 'text', description: 'Содержимое' },
    onDismiss: { action: 'dismissed' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
  args: { onDismiss: fn() },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: { variant: 'info', children: 'Информационное сообщение.' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Операция выполнена успешно.' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Обратите внимание на предупреждение.' },
}

export const Error: Story = {
  args: { variant: 'error', children: 'Произошла ошибка при выполнении.' },
}

export const Dismissible: Story = {
  args: { variant: 'info', dismissible: true, children: 'Это сообщение можно закрыть.' },
}

export const Toast: Story = {
  args: { variant: 'success', toast: true, dismissible: true, children: 'Сохранено!' },
}

export const AutoDismiss: Story = {
  args: { variant: 'success', toast: true, autoDismissMs: 3000, children: 'Исчезнет через 3 секунды.' },
}

export const LongContent: Story = {
  args: {
    variant: 'warning',
    dismissible: true,
    children: 'Очень длинное предупреждение для проверки переноса строк и поведения компонента при большом количестве текста. '.repeat(5),
  },
}
