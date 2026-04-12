import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconsShowcase } from './icons-showcase'

const meta = {
  component: IconsShowcase,
  parameters: { layout: 'centered' },
  argTypes: {
    children: { description: 'Ячейки с иконками' },
  },
} satisfies Meta<typeof IconsShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <IconsShowcase.Cell>★ StarIcon</IconsShowcase.Cell>
        <IconsShowcase.Cell>♥ HeartIcon</IconsShowcase.Cell>
        <IconsShowcase.Cell>⚙ GearIcon</IconsShowcase.Cell>
      </>
    ),
  },
}

const icons = ['★', '♥', '⚙', '✎', '♦', '♠', '♣', '♫', '☀', '☁', '✿', '⚡']

export const ManyCells: Story = {
  args: {
    children: (
      <>
        {icons.map((icon, i) => (
          <IconsShowcase.Cell key={i}>
            {icon}
            {' '}
            {`Icon ${i + 1}`}
          </IconsShowcase.Cell>
        ))}
      </>
    ),
  },
}
