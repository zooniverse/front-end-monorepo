import { createMedia } from '@artsy/fresnel'
import reduce from 'lodash/reduce'

import theme from '../../../helpers/theme'

const breakpoints = reduce(theme.global.breakpoints, (acc, breakpoint, size) => {
  if (breakpoint.value) {
    acc[size] = breakpoint.value
  }
  return acc
}, { default: 0 })

const AppMedia = createMedia({ breakpoints })

// Generate CSS to be injected into the head
export const mediaStyle = AppMedia.createMediaStyle()
export const { Media, MediaContextProvider } = AppMedia
