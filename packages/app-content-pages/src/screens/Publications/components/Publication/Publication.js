import { Media, ZooniverseLogo } from '@zooniverse/react-components'
import { Anchor, Box, Text } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  border-radius: 5px;
  overflow: hidden;
`

const Placeholder = ({ id }) => {
  return (
    <Box
      align='center'
      justify='center'
      background='brand'
      height='100%'
      width='100%'
    >
      <ZooniverseLogo size='50%' id={id} />
    </Box>
  )
}

function Publication({
  authors = '',
  avatarSrc = '',
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
      <StyledBox height='50px' width='50px' flex={false}>
        {!avatarSrc && <Placeholder id={displayString} />}
        {avatarSrc && (
          <Media
            height={50}
            src={avatarSrc}
            placeholder={<Placeholder id={displayString} />}
          />
        )}
      </StyledBox>
      <Box direction='column' gap='xxsmall'>
        {url?.length ? (
          <Anchor size='medium' href={url}>
            {displayString}
          </Anchor>
        ) : (
          <Text weight='bold'>{displayString}</Text>
        )}
      </Box>
    </Box>
  )
}

Publication.propTypes = {
  authors: string,
  avatarSrc: string,
  className: string,
  title: string,
  url: string,
  year: string
}

export default Publication
