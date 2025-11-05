import { SpacedText } from '@zooniverse/react-components'
import { Box, Button } from 'grommet'
import { Add, Chat } from 'grommet-icons'
import { arrayOf, shape, string } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import styled from 'styled-components'

import StartDiscussionModal from './components/StartDiscussionModal'

const StyledBox = styled(Box)`
  &::before,
  &::after {
    content: "";
    flex: 1 1 auto;
    height: 1px;
    background: ${props => props.theme.dark ? props.theme.global.colors['accent-1'] : props.theme.global.colors['neutral-1']};
  }
`

const StyledDiscussionButton = styled(Button)`
  &:focus,
  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
    text-decoration: none;
  }
`

function StartDiscussion({
  discussions = [],
  login = '',
  projectId,
  subjectId,
  userId = ''
}) {
  const [startDiscussionModalActive, setStartDiscussionModalActive] = useState(false)

  const { t } = useTranslation('screens')

  const totalCommentsCount = discussions?.reduce((total, discussion) => total + discussion.comments_count, 0) || 0

  function handleStartDiscussionActive() {
    setStartDiscussionModalActive(!startDiscussionModalActive)
  }

  return (
    <>
      <StartDiscussionModal
        active={startDiscussionModalActive}
        discussions={discussions}
        onClose={handleStartDiscussionActive}
        projectId={projectId}
        showCommentMessage={!!totalCommentsCount}
        subjectId={subjectId}
        userId={userId}
      />
      <StyledBox
        align='center'
        border={{ color: 'light-5', side: 'top', size: '0.5px' }}
        direction='row'
        flex={false}
        height='56px'
        pad={{ horizontal: 'small' }}
      >
        <StyledDiscussionButton
          disabled={!login}
          label={(
            <Box
              align='center'
              direction='row'
              gap='xsmall'
              justify='center'
            >
              <Chat
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                size='18px'
              />
              <SpacedText
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                size='1.125rem'
                weight={600}
              >
                {t('Talk.Discussions.startDiscussion')}
              </SpacedText>
              <Add
                color={{ dark: 'accent-1', light: 'neutral-1' }}
                size='18px'
              />
            </Box>
          )}
          margin={{ horizontal: 'xsmall' }}
          onClick={handleStartDiscussionActive}
          plain
        />
      </StyledBox>
    </>
  )
}

StartDiscussion.propTypes = {
  discussions: arrayOf(shape({
    id: string
  })),
  login: string,
  projectId: string.isRequired,
  subjectId: string.isRequired,
  userId: string
}

export default StartDiscussion
