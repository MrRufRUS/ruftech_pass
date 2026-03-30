import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './tooltip'

const meta = {
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    content: { control: 'text', description: 'Текст подсказки' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Положение подсказки',
    },
    children: { description: 'Элемент-триггер' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  args: {
    content: 'Подсказка сверху',
    position: 'top',
    children: <button type="button">Наведи на меня</button>,
  },
}

export const Bottom: Story = {
  args: {
    content: 'Подсказка снизу',
    position: 'bottom',
    children: <button type="button">Наведи на меня</button>,
  },
}

export const Left: Story = {
  args: {
    content: 'Подсказка слева',
    position: 'left',
    children: <button type="button">Наведи на меня</button>,
  },
}

export const Right: Story = {
  args: {
    content: 'Подсказка справа',
    position: 'right',
    children: <button type="button">Наведи на меня</button>,
  },
}

export const LongContent: Story = {
  args: {
    content: 'Очень длинный текст подсказки для проверки поведения',
    position: 'top',
    children: <button type="button">Наведи на меня</button>,
  },
}
