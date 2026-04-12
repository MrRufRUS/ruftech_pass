import type { Meta, StoryObj } from '@storybook/react-vite'
import { SortDropdown } from './sort-dropdown'

const meta = {
  component: SortDropdown,
  parameters: { layout: 'centered' },
  argTypes: {
    currentLabel: { control: 'text', description: 'Текст текущей сортировки' },
    options: { control: 'object', description: 'Список вариантов сортировки' },
  },
} satisfies Meta<typeof SortDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentLabel: 'По дате',
    options: [
      { label: 'По дате', href: '#date', active: true },
      { label: 'По имени', href: '#name' },
      { label: 'По популярности', href: '#popular' },
    ],
  },
}

export const ManyOptions: Story = {
  args: {
    currentLabel: 'Вариант 1',
    options: Array.from({ length: 10 }, (_, i) => ({
      label: `Вариант ${i + 1}`,
      href: `#option-${i + 1}`,
      active: i === 0,
    })),
  },
}

export const LongOptionLabels: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    currentLabel: 'Очень длинная сортировка '.repeat(3),
    options: [
      { label: 'Очень длинная сортировка по дате публикации'.repeat(2), href: '#date', active: true },
      { label: 'Очень длинная сортировка по имени автора'.repeat(2), href: '#name' },
      { label: 'Очень длинная сортировка по популярности'.repeat(2), href: '#popular' },
    ],
  },
}
