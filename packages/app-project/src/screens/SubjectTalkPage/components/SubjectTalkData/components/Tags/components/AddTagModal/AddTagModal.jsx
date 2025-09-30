import { Modal, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Form, FormField, TextInput } from 'grommet'
import { useState } from 'react'

import TagList from '../TagList'

function AddTagModal({
  active = false,
  disabled = false,
  onClose,
  onTagClick,
  projectDisplayName,
  tags = []
}) {
  const [newTagName, setNewTagName] = useState('')

  function handleChange(event) {
    const { value } = event.target
    setNewTagName(value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onTagClick({ name: newTagName })
    setNewTagName('')
  }

  return (
    <Modal
      active={active}
      closeFn={onClose}
      headingBackground='transparent'
      role='dialog'
      round='8px'
      title='Add a Popular Tag'
      titleColor='black'
    >
      <Box
        gap='small'
      >
        <SpacedText size='small'>
          {`From ${projectDisplayName}`}
        </SpacedText>
        <TagList
          disabled={disabled}
          onTagClick={onTagClick}
          tags={tags}
        />
        <Form
          onSubmit={handleSubmit}
        >
            <FormField
              label='Add a tag'
              htmlFor='tag-name'
              name='tag-name'
              validate={[
                (name) => {
                  if (name && !/^[\w-]{3,40}$/.test(name)) {
                    return 'Use 3-40 characters, letters, numbers, hyphens, and underscores. No spaces or other characters.'
                  }
                  return undefined
                }
              ]}
              validateOn='submit'
            >
              <TextInput
                id='tag-name'
                name='tag-name'
                onChange={handleChange}
                value={newTagName}
              />
            </FormField>
            <Button type='submit' label='submit' />
        </Form>
      </Box>
    </Modal>
  )
}

export default AddTagModal
