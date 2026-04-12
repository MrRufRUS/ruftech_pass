import type { Meta, StoryObj } from '@storybook/react-vite'
import { Paragraph } from './paragraph'

const meta = {
  component: Paragraph,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { control: 'text', description: 'Содержимое параграфа' },
  },
} satisfies Meta<typeof Paragraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Текст параграфа для демонстрации стилей типографики.' },
}

export const LongText: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: { children: 'Длинный параграф текста для проверки переноса строк. '.repeat(10) },
}
