import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ArticleCell } from '../article-cell'
import { ArticleLink } from './article-link'

const meta = {
  component: ArticleLink,
  parameters: { layout: 'centered' },
  argTypes: {
    href: { control: 'text', description: 'URL ссылки' },
    children: { description: 'Содержимое ссылки (обычно ArticleCell)' },
    'aria-label': { control: 'text', description: 'Доступное имя' },
    tabIndex: { control: 'number', description: 'Порядок фокуса' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '/articles/react-guide',
    children: (
      <ArticleCell
        title="Руководство по React 19"
        date="2025-01-15"
        readTime="5 мин"
        tags={['react', 'typescript', 'css']}
        onTagClick={fn()}
      />
    ),
  },
}

export const LongTitle: Story = {
  args: {
    href: '/articles/long-title',
    children: (
      <ArticleCell
        title={'Очень длинный заголовок статьи о React и TypeScript '.repeat(3)}
        date="2025-01-15"
        readTime="15 мин"
        tags={['react', 'typescript']}
        onTagClick={fn()}
      />
    ),
  },
}

export const ManyTags: Story = {
  args: {
    href: '/articles/tagged',
    children: (
      <ArticleCell
        title="Статья с множеством тегов"
        date="2025-01-15"
        readTime="5 мин"
        tags={['react', 'typescript', 'css', 'vanilla-extract', 'storybook', 'vite']}
        onTagClick={fn()}
      />
    ),
  },
}

export const MinimalData: Story = {
  args: {
    href: '/articles/minimal',
    children: (
      <ArticleCell
        title="Минимум данных"
        date="2025-01-15"
        readTime="1 мин"
        tags={[]}
        onTagClick={fn()}
      />
    ),
  },
}
