import { composeStory } from '@storybook/react'
import preview from './preview.js'

export const specStory = (...args) => {
  return composeStory(...args, preview)
}

export default specStory
