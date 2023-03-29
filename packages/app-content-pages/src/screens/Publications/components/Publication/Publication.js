import { Media, ZooniverseLogo } from '@zooniverse/react-components'
import { Anchor, Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  border-radius: 5px;
  overflow: hidden;
`

const Placeholder = (
  <Box
    align='center'
    justify='center'
    background='brand'
    height='100%'
    width='100%'
  >
    <ZooniverseLogo id='Publication Placeholder' size='50%' />
  </Box>
)

function Publication ({
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
      direction='row'
      gap='small'
      margin={{ bottom: 'small' }}
    >
      <StyledBox height='50px' width='50px' flex={false}>
        {!avatarSrc && Placeholder}
        {avatarSrc && (
          <Media
            height={50}
            src={avatarSrc}
            placeholder={Placeholder}
          />
        )}
      </StyledBox>
      <Box direction='column' gap='xxsmall'>
        <Anchor size='medium' href={url}>
          {displayString}
        </Anchor>
      </Box>
    </Box>
  )
}

Publication.propTypes = {
  /** List of author names */
  authors: string,
  /** Must be an update compatible Media component from @zooniverse/react-components */
  avatarSrc: string,
  className: string,
  /** Title of publication */
  title: string,
  /** Url linking to published document on the web */
  url: string,
  /** Year of publication */
  year: string
}

export default Publication
