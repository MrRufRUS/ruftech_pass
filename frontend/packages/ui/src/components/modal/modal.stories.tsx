import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from '../button'
import { Modal } from './modal'

const meta = {
  component: Modal,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    open: { control: 'boolean', description: 'Открыто ли модальное окно' },
    title: { control: 'text', description: 'Заголовок' },
    children: { description: 'Содержимое модального окна' },
    onClose: { action: 'closed' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
  args: { onClose: fn() },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    title: 'Подтверждение',
    children: (
      <>
        <Modal.Body>Вы уверены, что хотите продолжить?</Modal.Body>
        <Modal.Footer>
          <Button variant="surface" onClick={fn()}>Отмена</Button>
          <Button variant="successFilled" onClick={fn()}>Подтвердить</Button>
        </Modal.Footer>
      </>
    ),
  },
}

export const WithoutTitle: Story = {
  args: {
    open: true,
    children: (
      <Modal.Body>Содержимое без заголовка.</Modal.Body>
    ),
  },
}

export const LongContent: Story = {
  args: {
    open: true,
    title: 'Длинное содержимое',
    children: (
      <Modal.Body>
        {'Длинный текст модального окна для проверки прокрутки и переноса строк. '.repeat(20)}
      </Modal.Body>
    ),
  },
}

export const LongTitle: Story = {
  args: {
    open: true,
    title: 'Очень длинный заголовок модального окна '.repeat(3),
    children: (
      <Modal.Body>Содержимое.</Modal.Body>
    ),
  },
}

export const Closed: Story = {
  args: {
    open: false,
    title: 'Невидимое',
    children: (
      <Modal.Body>Это не должно отображаться.</Modal.Body>
    ),
  },
}
