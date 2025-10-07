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

const DEFAULT_VALUE = {
  discussion_board: '',
  discussion_title: '',
  discussion_comment: ''
}

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
  const [value, setValue] = useState(DEFAULT_VALUE)

  const { t } = useTranslation('screens')

  useEffect(() => {
    const subjectDefaultBoard = boards?.find(board => board.subject_default)

    const newDefaultValue = {
      ...value,
      discussion_board: subjectDefaultBoard?.id || boards?.[0]?.id || '',
      discussion_title: subjectDefaultBoard?.id ? `Subject ${subjectId}` : ''
    }

    setValue(newDefaultValue)
  }, [boards])

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
  const selectedBoard = boards?.find(board => board.id === value.discussion_board)

  let commentInputLabel = t('Talk.Discussions.initialComment')
  let submitButtonLabel = t('Talk.Discussions.startDiscussion')
  if (selectedBoard?.subject_default) {
    commentInputLabel = t('Talk.Discussions.newComment')
    submitButtonLabel = t('Talk.Discussions.addComment')
  }

  function handleChange(nextValue) {
    const selectedBoard = boards?.find(board => board.id === nextValue.discussion_board)
    const subjectDefaultBoard = selectedBoard.subject_default || boards?.find(board => board.subject_default)
    if (selectedBoard?.subject_default) {
      nextValue.discussion_title = `Subject ${subjectId}`
    } else if ((value.discussion_board === subjectDefaultBoard?.id) && (nextValue.discussion_board !== subjectDefaultBoard?.id)) {
      nextValue.discussion_title = ''
    }
    setValue(nextValue)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      ...value,
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
              {t('Talk.Tags.somethingWentWrong')}
            </SpacedText>
          </Box>
        ) : loading ? (
          <Box align='center' justify='center' fill pad='medium'>
            <Loader />
          </Box>
        ) : (
          <Form
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={value}
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
                    direction='row'
                    name='discussion_board'
                    options={boardOptions}
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
                  <TextInput disabled={selectedBoard?.subject_default} name='discussion_title' />
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
                  <StyledTextArea name='discussion_comment' plain />
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
