import { Markdownz, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Paragraph, Image } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'

const StyledParagraph = styled(Paragraph)`
  max-width: 100%;
`

const StyledAvatar = styled(Image)`
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 50%;
`

const components = {
  p: (nodeProps) => (
    <Paragraph
      margin={{ top: 'none' }}
      size='xlarge'
    >
      {nodeProps.children}
    </Paragraph>
  )
}

function MessageFromResearcher ({
  avatar,
  message,
  researcher,
  talkLink
}) {
  const { t } = useTranslation('screens')

  return (
    <ContentBox title={t('Home.MessageFromResearcher.title')}>

      {!message && (
        <>
          <StyledParagraph margin={{ bottom: 'small', top: 'none' }}>
            {t('Home.MessageFromResearcher.noMessage')}
          </StyledParagraph>
          <div>
            <Button href={talkLink} label={t('Home.MessageFromResearcher.noMessageButton')} />
          </div>
        </>
      )}

      {!!message && (
        <Box direction='row' gap='medium'>
          <StyledAvatar src={avatar} />
          <Box>
            <Markdownz components={components}>{message}</Markdownz>
            <SpacedText lang='en' color='light-5' size='small'>{researcher}</SpacedText>
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
