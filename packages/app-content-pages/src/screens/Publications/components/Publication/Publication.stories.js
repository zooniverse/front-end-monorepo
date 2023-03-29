import { Box } from 'grommet'
import GrommetWrapper from '@helpers/stories/GrommetWrapper.js'
import Publication from './Publication.js'

const publicationArgs = {
  authors: 'Mock Author',
  avatarSrc:
    'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png',
  title: 'Mock Publication',
  url: 'https://www.zooniverse.org',
  year: '2023'
}

export default {
  title: 'Publications / Publication',
  component: Publication,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => {
  return (
    <GrommetWrapper dark={dark}>
      <Box width='100%'>
        <Publication {...publicationArgs} />
      </Box>
    </GrommetWrapper>
  )
}

export const Placeholders = ({ dark }) => {
  return (
    <GrommetWrapper dark={dark}>
      <Box width='100%'>
        <Publication />
      </Box>
    </GrommetWrapper>
  )
}
