import { Box } from 'grommet'

import PlaceholderSVG from './PlaceholderSVG'

export default {
  title: 'Subject Viewers / SingleImageViewer / PlaceholderSVG',
  component: PlaceholderSVG
}

export function Default() {
  return (
    <Box width='large'>
      <PlaceholderSVG />
    </Box>
  )
}

export function CustomMaxWidthAndHeight() {
  return (
    <Box width='large'>
      <PlaceholderSVG
        maxWidth='500px'
        maxHeight='400px'
      />
    </Box>
  )
}

export function CustomViewBox() {
  return (
    <Box width='large'>
      <PlaceholderSVG
        viewBox='0 0 400 300'
      />
    </Box>
  )
}
