import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './button'

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Содержимое кнопки',
    },
    variant: {
      control: 'select',
      options: ['surface', 'success'],
      description: 'Вариант фона',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'full'],
      description: 'Скругление углов',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML-тип кнопки',
    },
    'aria-label': {
      control: 'text',
      description: 'Доступное имя (для кнопок-иконок)',
    },
    'aria-disabled': {
      control: 'boolean',
      description: 'a11y-неактивность без блокировки фокуса',
    },
    'aria-pressed': {
      control: 'select',
      options: [undefined, true, false, 'mixed'],
      description: 'Состояние переключателя',
    },
    'aria-expanded': {
      control: 'boolean',
      description: 'Управляет раскрываемым содержимым',
    },
    'aria-haspopup': {
      control: 'select',
      options: [undefined, true, 'menu', 'listbox', 'tree', 'grid', 'dialog'],
      description: 'Открывает попап / меню / диалог',
    },
    tabIndex: {
      control: 'number',
      description: 'Порядок фокуса',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const ButtonStory: Story = {
  args: {
    children: 'Йа Кнопко',
    type: 'button',
    disabled: false,
  },
}

export const Success: Story = {
  args: {
    children: 'Успех',
    variant: 'success',
  },
}

const Slots = () => (
  <>
    <Button.Left style={{ color: 'red' }}>{'<'}</Button.Left>
    <Button.Center>Кнопка</Button.Center>
    <Button.Right>{'>'}</Button.Right>
  </>
)

export const WithSlots: Story = {
  args: {
    variant: 'surface',
    rounded: 'md',
    children: <Slots />,
  },
}
