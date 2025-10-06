import { Loader, Modal, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Form, FormField, RadioButtonGroup, TextArea, TextInput } from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

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
  subjectId = ''
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
    label: board.title,
    value: board.id
  })) || []
  const selectedBoard = boards?.find(board => board.id === value.discussion_board)

  let commentInputLabel = 'Initial Comment'
  let submitButtonLabel = 'Start a new discussion'
  if (selectedBoard?.subject_default) {
    commentInputLabel = 'New Comment'
    submitButtonLabel = 'Add your comment'
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
      title='Start a new discussion'
      titleColor='black'
    >
      <Box
        gap='small'
        width='600px'
      >{error ? (
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
          <FormField
            htmlFor='discussion_board'
            label={<SpacedText>Discussion Board</SpacedText>}
            name='discussion_board'
            required
          >
            <RadioButtonGroup
              name='discussion_board'
              options={boardOptions}
            />
          </FormField>
          {showCommentMessage && (
            <Box
              direction='row'
              gap='xxsmall'
              align='center'
            >
              <CircleInformation size='0.75rem' />
              <SpacedText
                size='xsmall'
                uppercase={false}
              >
                {'To respond to a specific comment, click on that comment to go to the discussion.'}
              </SpacedText>
            </Box>
          )}
          <FormField
            disabled={selectedBoard?.subject_default}
            htmlFor='discussion_title'
            label={<SpacedText>Discussion Title</SpacedText>}
            name='discussion_title'
            required
          >
            <TextInput disabled={selectedBoard?.subject_default} name='discussion_title' />
          </FormField>
          <FormField
            htmlFor='discussion_comment'
            label={<SpacedText>{commentInputLabel}</SpacedText>}
            name='discussion_comment'
            required
          >
            <TextArea name='discussion_comment' />
          </FormField>
          <Box
            align='center'
            direction='row'
            justify='end'
          >
            <Button
              label={submitButtonLabel}
              primary
              type='submit'
            />
          </Box>
        </Form>
      )}
      </Box>
    </Modal>
  )
}

// StartDiscussionModal.propTypes = {}

export default StartDiscussionModal
