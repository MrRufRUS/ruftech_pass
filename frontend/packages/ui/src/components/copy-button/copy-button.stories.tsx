import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyButton } from './copy-button'

const meta = {
  component: CopyButton,
  parameters: { layout: 'centered' },
  argTypes: {
    copyTargetSelector: { control: 'text', description: 'CSS-селектор элемента для копирования' },
    labelCopy: { control: 'text', description: 'Текст кнопки (по умолчанию)' },
    labelCopied: { control: 'text', description: 'Текст кнопки (после копирования)' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
  },
  decorators: [(Story) => (
    <div>
      <p id="copy-target">Текст для копирования</p>
      <Story />
    </div>
  )],
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { copyTargetSelector: '#copy-target' },
}

export const CustomLabels: Story = {
  args: { copyTargetSelector: '#copy-target', labelCopy: 'Копировать код', labelCopied: 'Код скопирован!' },
}

export const LongLabels: Story = {
  decorators: [
    (Story) => (
      <div>
        <p id="copy-target-long">Текст для копирования</p>
        <div style={{ maxWidth: 150 }}>
          <Story />
        </div>
      </div>
    ),
  ],
  args: { copyTargetSelector: '#copy-target-long', labelCopy: 'Скопировать содержимое '.repeat(3), labelCopied: 'Содержимое скопировано '.repeat(3) },
}
