import { Anchor, Box, Text } from 'grommet'
import { string } from 'prop-types'

function Publication({
  authors = '',
  className = '',
  title = '',
  url = '',
  year = ''
}) {
  const displayString = [title, authors, year].filter(v => v).join(', ')

  return (
    <Box
      className={className}
      data-testid='publication-test-element'
      direction='row'
      gap='small'
      margin={{ bottom: 'small' }}
    >
      {url?.length ? (
        <Anchor size='1rem' href={url}>
          {displayString}
        </Anchor>
      ) : (
        <Text weight='bold' size='1rem'>{displayString}</Text>
      )}
    </Box>
  )
}

Publication.propTypes = {
  authors: string,
  className: string,
  title: string,
  url: string,
  year: string
}

export default Publication
