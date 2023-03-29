import { Box } from 'grommet'
import GrommetWrapper from '@helpers/stories/GrommetWrapper.js'
import Publication from './Publication.js'

const publicationArgs = {
  authors: 'Mock Author',
  avatarSrc: 'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png',
  title: 'Mock Publication',
  url: 'https://www.zooniverse.org',
  year: '2023'
}

export default {
  title: 'Publications / Publication',
  component: Publication,
  args: {
    dark: false,
    ...publicationArgs
  }
}

/** Publication Component with all props provided */

export const Default = ({ authors, avatarSrc, dark, title, url, year }) => {
  return (
    <GrommetWrapper dark={dark}>
      <Box width='100%'>
        <Publication
          authors={authors}
          avatarSrc={avatarSrc}
          title={title}
          url={url}
          year={year}
        />
      </Box>
    </GrommetWrapper>
  )
}


/** Publication Component with no props provided */

export const Placeholders = ({ dark }) => {
  return (
    <GrommetWrapper dark={dark}>
      <Box width='100%'>
        <Publication />
      </Box>
    </GrommetWrapper>
  )
}
