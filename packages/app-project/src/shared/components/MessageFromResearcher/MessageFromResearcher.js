import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import en from './locales/en'
import ContentBox from '../ContentBox'
import { Anchor, Box, Paragraph, Image } from 'grommet'
import Link from 'next/link'
import styled from 'styled-components'

counterpart.registerTranslations('en', en)

const StyledAnchor = styled(Anchor)`
  font-weight: 200;
  text-transform: uppercase;
`

const StyledParagraph = styled(Paragraph)`
  max-width: 100%;
`

const StyledAvatar = styled(Image)`
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 24px;
`

function MessageFromResearcher({
  message,
  socialUsername,
  socialLink,
  avatar
}) {
  return (
    <ContentBox title={counterpart('MessageFromResearcher.title')}>
      <Box direction="row">
        <StyledAvatar src={avatar} />
        <Box>
          <StyledParagraph margin={{ bottom: 'tiny', top: 'none' }}>
            {message}
          </StyledParagraph>
          <Link href={socialLink} passHref>
            <StyledAnchor size="small">{socialUsername}</StyledAnchor>
          </Link>
        </Box>
      </Box>
    </ContentBox>
  )
}

MessageFromResearcher.propTypes = {
  message: PropTypes.string,
  socialUsername: PropTypes.string,
  socialLink: PropTypes.string,
  avatar: PropTypes.string
}

export default MessageFromResearcher
