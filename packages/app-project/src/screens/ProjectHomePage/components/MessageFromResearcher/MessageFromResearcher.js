import { Markdownz, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Button, Paragraph, Image } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'
import ContentBox from '@shared/components/ContentBox'

counterpart.registerTranslations('en', en)

const StyledParagraph = styled(Paragraph)`
  max-width: 100%;
`

const StyledAvatar = styled(Image)`
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 50%;
`

counterpart.registerTranslations('en', en)

const components = {
  p: (nodeProps) => (
    <Paragraph
      children={nodeProps.children}
      margin={{ top: 'none' }}
      size='xlarge'
    />
  )
}

function MessageFromResearcher ({
  avatar,
  message,
  researcher,
  talkLink
}) {
  return (
    <ContentBox title={counterpart('MessageFromResearcher.title')}>

      {!message && (
        <>
          <StyledParagraph
            children={counterpart('MessageFromResearcher.noMessage')}
            margin={{ bottom: 'small', top: 'none' }}
          />
          <div>
            <Button href={talkLink} label={counterpart('MessageFromResearcher.noMessageButton')} />
          </div>
        </>
      )}

      {!!message && (
        <Box direction='row' gap='medium'>
          <StyledAvatar src={avatar} />
          <Box>
            <Markdownz children={message} components={components} />
            <SpacedText children={researcher} color='light-5' size='small' />
          </Box>
        </Box>
      )}

    </ContentBox>
  )
}

MessageFromResearcher.propTypes = {
  avatar: string,
  message: string,
  researcher: string,
  talkLink: string
}

export default MessageFromResearcher
