import { Box } from 'grommet'
import Publication from './Publication.js'

export default {
  title: 'Publications / Publication',
  component: Publication,
  args: {
    authors: 'Mock Author',
    avatarSrc:
      'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png',
    title: 'Mock Publication',
    url: 'https://www.zooniverse.org',
    year: '2023'
  }
}

/** Publication Component with all props provided */

export const Default = ({ authors, avatarSrc, title, url, year }) => {
  return (
    <Box width='100%'>
      <Publication
        authors={authors}
        avatarSrc={avatarSrc}
        title={title}
        url={url}
        year={year}
      />
    </Box>
  )
}

/** Publication Component with no props provided */

export const Placeholders = () => {
  return (
    <Box width='100%'>
      <Publication />
    </Box>
  )
}
