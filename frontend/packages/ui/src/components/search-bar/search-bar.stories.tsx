import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchBar } from './search-bar'

const meta = {
  component: SearchBar,
  parameters: { layout: 'centered' },
  argTypes: {
    tags: { control: 'object', description: 'Список тегов для поиска' },
    placeholder: { control: 'text', description: 'Текст-заполнитель' },
    emptyMessage: { control: 'text', description: 'Сообщение при пустом результате' },
  },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tags: [
      { label: 'react' },
      { label: 'typescript' },
      { label: 'css' },
      { label: 'vanilla-extract' },
      { label: 'storybook' },
    ],
  },
}

export const ManyTags: Story = {
  args: {
    tags: Array.from({ length: 15 }, (_, i) => ({ label: `тег-${i + 1}` })),
  },
}

export const LongTagLabels: Story = {
  args: {
    tags: [
      { label: 'длинный-тег-'.repeat(3) },
      { label: 'ещё-один-длинный-тег-'.repeat(3) },
      { label: 'третий-длинный-тег-'.repeat(3) },
    ],
  },
}

export const EmptyTags: Story = {
  args: {
    tags: [],
    emptyMessage: 'Теги не найдены',
  },
}

export const CustomPlaceholder: Story = {
  args: {
    tags: [{ label: 'react' }, { label: 'css' }],
    placeholder: 'Найти по тегу...',
    emptyMessage: 'Ничего не найдено',
  },
}
