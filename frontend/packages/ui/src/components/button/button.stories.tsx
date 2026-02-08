import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Logo } from '../logo'
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
      options: ['surface', 'success', 'successFilled', 'errorFilled'],
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

export const Default: Story = {
  args: {
    children: 'Йа Кнопко',
    type: 'button',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Йа Кнопко',
    type: 'button',
    disabled: true,
  },
}

export const Success: Story = {
  args: {
    children: 'Успех',
    variant: 'success',
  },
}

export const SuccessFilled: Story = {
  args: {
    children: 'Успех',
    variant: 'successFilled',
  },
}

export const ErrorFilled: Story = {
  args: {
    children: 'Ошибка',
    variant: 'errorFilled',
  },
}

const Slots = () => (
  <>
    <Button.Left>{'<'}</Button.Left>
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

export const Overflow: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: 'йа переполнилсо!'.repeat(10),
  },
}

const OverflowSlots = () => (
  <>
    <Button.Left>{'<'}</Button.Left>
    <Button.Center>{'йа переполнилсо!'.repeat(10)}</Button.Center>
    <Button.Right>{'>'}</Button.Right>
  </>
)

export const OverflowWithSlots: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: <OverflowSlots />,
  },
}

const OverflowCenterSlots = () => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Button.Left style={{ flexShrink: 0 }}>{'<'}</Button.Left>
    <Button.Center style={{ overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
      {'йа переполнилсо!'.repeat(10)}
    </Button.Center>
    <Button.Right style={{ flexShrink: 0 }}>{'>'}</Button.Right>
  </span>
)

export const OverflowCenter: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 250 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: <OverflowCenterSlots />,
  },
}

export const WithLogo: Story = {
  args: {
    children: <Logo width={100} height="auto" />,
  },
}
