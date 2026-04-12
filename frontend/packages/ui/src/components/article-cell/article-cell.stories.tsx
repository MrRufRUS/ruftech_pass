import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ArticleCell } from './article-cell'

const meta = {
  component: ArticleCell,
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text', description: 'Заголовок статьи' },
    date: { control: 'text', description: 'Дата публикации' },
    readTime: { control: 'text', description: 'Время чтения' },
    tags: { control: 'object', description: 'Список тегов' },
    onTagClick: { action: 'tag-clicked', description: 'Обработчик клика по тегу' },
  },
  args: {
    onTagClick: fn(),
  },
} satisfies Meta<typeof ArticleCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Заголовок статьи',
    date: '2025-01-15',
    readTime: '5 мин',
    tags: ['react', 'typescript', 'css'],
  },
}

export const WithAlert: Story = {
  args: {
    title: 'Заголовок статьи',
    date: '2025-01-15',
    readTime: '5 мин',
    tags: ['react', 'typescript', 'css'],
    onTagClick: (tag) => alert(`Переход: /tags/${tag}`),
  },
}

export const LongTitle: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 350 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Очень длинный заголовок статьи о React и TypeScript '.repeat(5),
    date: '2025-01-15',
    readTime: '15 мин',
    tags: ['react', 'typescript'],
  },
}

export const ManyTags: Story = {
  args: {
    title: 'Статья с большим количеством тегов',
    date: '2025-01-15',
    readTime: '5 мин',
    tags: ['react', 'typescript', 'css', 'vanilla-extract', 'storybook', 'vite', 'node'],
  },
}

export const MinimalData: Story = {
  args: {
    title: 'Минимум данных',
    date: '2025-01-15',
    readTime: '1 мин',
    tags: [],
  },
}
