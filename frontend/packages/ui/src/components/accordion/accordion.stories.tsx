import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './accordion'

const meta = {
  component: Accordion,
  parameters: { layout: 'centered' },
  argTypes: {
    a11ySummaryLabel: { control: 'text', description: 'Доступная подпись кнопки раскрытия' },
    summaryContent: { control: 'text', description: 'Содержимое заголовка' },
    children: { control: 'text', description: 'Содержимое аккордеона' },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    a11ySummaryLabel: 'Раскрыть подробности',
    summaryContent: 'Подробности',
    children: 'Скрытое содержимое аккордеона.',
  },
}

export const LongSummary: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    a11ySummaryLabel: 'Раскрыть подробности',
    summaryContent: 'Очень длинный заголовок аккордеона для проверки переноса '.repeat(3),
    children: 'Скрытое содержимое.',
  },
}

export const LongContent: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    a11ySummaryLabel: 'Раскрыть подробности',
    summaryContent: 'Подробности',
    children: 'Длинное скрытое содержимое аккордеона для проверки переноса строк. '.repeat(10),
  },
}

export const NoSummaryContent: Story = {
  args: {
    a11ySummaryLabel: 'Раскрыть подробности',
    children: 'Содержимое без видимого заголовка.',
  },
}
