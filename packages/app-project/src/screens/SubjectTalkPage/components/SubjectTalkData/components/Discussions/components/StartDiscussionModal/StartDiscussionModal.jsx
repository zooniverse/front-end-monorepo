import { Modal, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Form, FormField, RadioButtonGroup, TextInput } from 'grommet'
import { useEffect, useState } from 'react'

const DEFAULT_HANDLER = () => true

const DEFAULT_VALUE = {
  discussion_board: 'General',
  discussion_title: '',
  discussion_comment: ''
}

function StartDiscussionModal({
  active = false,
  defaultValue = DEFAULT_VALUE,
  onClose
}) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  function handleChange(nextValue, { touched }) {
    setValue(nextValue)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('form submitted', value)
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
      >
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
              options={['General', 'Question', 'Idea', 'Problem']}
            />
          </FormField>
          <FormField
            htmlFor='discussion_title'
            label={<SpacedText>Discussion Title</SpacedText>}
            name='discussion_title'
            required
          >
            <TextInput name='discussion_title' />
          </FormField>
          <FormField
            htmlFor='discussion_comment'
            label={<SpacedText>Initial Comment</SpacedText>}
            name='discussion_comment'
            required
          >
            <TextInput
              name='discussion_comment'
              type='textarea'
            />
          </FormField>
          <Box
            align='center'
            direction='row'
            justify='end'
          >
            <Button
              label='Start a new discussion'
              primary
              type='submit'
            />
          </Box>
        </Form>
      </Box>
    </Modal>
  )
}

export default StartDiscussionModal
