import { Loader, Modal, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Form, FormField, RadioButtonGroup, Text, TextArea, TextInput, ThemeContext } from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  & > label > div {
    margin-right: 5px;
  }
`

const StyledTextArea = styled(TextArea)`
  height: 132px;
`

const StyledButton = styled(Button)`
  border-radius: 4px;
  font-size: 1rem;
  width: 300px;
`

const DEFAULT_HANDLER = () => true

function StartDiscussionModal({
  active = false,
  boards = undefined,
  error = null,
  loading = false,
  onClose,
  onSubmit = DEFAULT_HANDLER,
  showCommentMessage = false,
  subjectId = undefined
}) {
  const [discussion_board, setDiscussionBoard] = useState('')
  const [discussion_title, setDiscussionTitle] = useState('')
  const [discussion_comment, setDiscussionComment] = useState('')

  const { t } = useTranslation('screens')

  useEffect(() => {
    const subjectDefaultBoard = boards?.find(board => board.subject_default)

    if (!discussion_board) {
      setDiscussionBoard(subjectDefaultBoard?.id || boards?.[0]?.id || '')
      setDiscussionTitle(subjectDefaultBoard?.id ? `Subject ${subjectId}` : '')
    }
  }, [boards, subjectId])

  const boardOptions = boards?.map(board => ({
    label: (
      <Text
        color={{ dark: 'light-1', light: 'dark-4' }}
        margin='none'
        pad='none'
        size='.875rem'
      >
        {board.title}
      </Text>
    ),
    value: board.id
  })) || []
  const selectedBoard = boards?.find(board => board.id === discussion_board)

  let commentInputLabel = t('Talk.Discussions.initialComment')
  let submitButtonLabel = t('Talk.Discussions.startDiscussion')
  if (selectedBoard?.subject_default) {
    commentInputLabel = t('Talk.Discussions.newComment')
    submitButtonLabel = t('Talk.Discussions.addComment')
  }

  function handleBoardChange(event) {
    const newBoard = event?.target?.value
    const selected = boards?.find(board => board.id === newBoard)
    const subjectDefaultBoard = selected?.subject_default || boards?.find(board => board.subject_default)

    // If the newly selected board is a subject_default board, set the title to Subject {id}
    if (selected?.subject_default) {
      setDiscussionTitle(`Subject ${subjectId}`)
    // If we changed away from a subject_default board, clear the title
    } else if ((discussion_board === subjectDefaultBoard?.id) && (newBoard !== subjectDefaultBoard?.id)) {
      setDiscussionTitle('')
    }

    setDiscussionBoard(newBoard)
  }

  function handleTitleChange(event) {
    setDiscussionTitle(event?.target?.value)
  }

  function handleCommentChange(event) {
    setDiscussionComment(event?.target?.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      discussion_board,
      discussion_title,
      discussion_comment,
      subject_default: selectedBoard?.subject_default || false
    })
  }

  return (
    <Modal
      active={active}
      bodyBackground='transparent'
      closeFn={onClose}
      headingBackground='transparent'
      pad={{ horizontal: 'small', top: 'xsmall', bottom: 'medium' }}
      role='dialog'
      title={t('Talk.Discussions.startDiscussion')}
      titleColor='black'
    >
      <Box
        gap='small'
        width='600px'
      >
        {error ? (
          <Box align='center' justify='center' fill pad='medium'>
            <SpacedText uppercase={false}>
              {t('Talk.somethingWentWrong')}
            </SpacedText>
          </Box>
        ) : loading ? (
          <Box align='center' justify='center' fill pad='medium'>
            <Loader />
          </Box>
        ) : (
          <Form
            onSubmit={handleSubmit}
            value={{
              discussion_board,
              discussion_title,
              discussion_comment
            }}
          >
            <Box gap='small'>
              <ThemeContext.Extend value={{
                formField: {
                  border: false,
                  label: { margin: { horizontal: 'none', top: 'none' }},
                  margin: 'none'
                },
              }}>
                <FormField
                  htmlFor='discussion_board'
                  label={<SpacedText>{t('Talk.Discussions.discussionBoard')}</SpacedText>}
                  name='discussion_board'
                  required
                >
                  <StyledRadioButtonGroup
                    id='discussion_board'
                    direction='row'
                    name='discussion_board'
                    onChange={handleBoardChange}
                    options={boardOptions}
                    value={discussion_board}
                  />
                </FormField>
              </ThemeContext.Extend>
              {showCommentMessage && (
                <Box
                  align='center'
                  direction='row'
                  gap='xxsmall'
                >
                  <CircleInformation size='0.75rem' />
                  <SpacedText
                    size='xsmall'
                    uppercase={false}
                  >
                    {t('Talk.Discussions.commentMessage')}
                  </SpacedText>
                </Box>
              )}
              <ThemeContext.Extend value={{
                formField: {
                  border: {
                    color: 'light-5',
                    side: 'all',
                    size: '1px'
                  },
                  label: { margin: { horizontal: 'none', top: 'none' }},
                  margin: 'none'
                }
              }}>
                <FormField
                  contentProps={{ round: '4px' }}
                  disabled={selectedBoard?.subject_default}
                  htmlFor='discussion_title'
                  label={<SpacedText>{t('Talk.Discussions.discussionTitle')}</SpacedText>}
                  name='discussion_title'
                  required
                >
                  <TextInput
                    id='discussion_title'
                    disabled={selectedBoard?.subject_default}
                    name='discussion_title'
                    onChange={handleTitleChange}
                    value={discussion_title}
                  />
                </FormField>
              </ThemeContext.Extend>
              <ThemeContext.Extend value={{
                formField: {
                  border: {
                    color: 'light-5',
                    side: 'all',
                    size: '0.5px'
                  },
                  label: { margin: { horizontal: 'none', top: 'none' }},
                  margin: 'none'
                }
              }}>
                <FormField
                  contentProps={{ round: '4px' }}
                  htmlFor='discussion_comment'
                  label={<SpacedText>{commentInputLabel}</SpacedText>}
                  name='discussion_comment'
                  required
                >
                  <StyledTextArea
                    id='discussion_comment'
                    name='discussion_comment'
                    onChange={handleCommentChange}
                    plain
                    value={discussion_comment}
                  />
                </FormField>
              </ThemeContext.Extend>
              <Box
                align='center'
                direction='row'
                justify='end'
              >
                <StyledButton
                  color={{ light: 'neutral-1', dark: 'accent-1' }}
                  label={submitButtonLabel}
                  primary
                  type='submit'
                />
              </Box>
            </Box>
          </Form>
        )}
      </Box>
    </Modal>
  )
}

StartDiscussionModal.propTypes = {
  active: bool,
  boards: arrayOf(shape({
    id: string,
    subject_default: bool,
    title: string
  })),
  error: shape({}),
  loading: bool,
  onClose: func.isRequired,
  onSubmit: func,
  showCommentMessage: bool,
  subjectId: string
}

export default StartDiscussionModal
