import { Modal, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Form, FormField, TextInput } from 'grommet'
import { useState } from 'react'
import styled from 'styled-components'

import TagList from '../TagList'

const StyledButton = styled(Button)`
  border-radius: 4px;
  border: ${props => props.theme.dark ?
    `0.5px solid #E0D4F6` 
    : `0.5px solid #4D2A8E`
  };
  color: ${props => props.theme.dark ?
    '#E0D4F6'
    : '#4D2A8E'
  };
  height: 40px;
  min-width: 110px;
`

const StyledFormField = styled(FormField)`
  flex: 1;
  margin: 0;

  label {
    margin-left: 0;
  }
`

const StyledTextInput = styled(TextInput)`
  border-radius: 4px;
  border: 1px solid #A6A7A9;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25) inset;
  height: 40px;
`

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
      bodyBackground='transparent'
      closeFn={onClose}
      headingBackground='transparent'
      pad={{ horizontal: 'small', top: 'xsmall', bottom: 'medium' }}
      role='dialog'
      title='Add a Tag'
      titleColor='black'
    >
      <Box
        gap='xsmall'
        width='600px'
      >
        <SpacedText size='small'>
          {`Popular Tags From ${projectDisplayName}`}
        </SpacedText>
        <TagList
          disabled={disabled}
          onTagClick={onTagClick}
          tags={tags}
        />
        <Form
          onSubmit={handleSubmit}
        >
          <Box
            align='end'
            direction='row'
            gap='small'
          >
            <StyledFormField
              htmlFor='tag-name'
              label={<SpacedText>Create a new tag</SpacedText>}
              name='tag-name'
              validate={[
                (name) => {
                  if (!name || name && !/^[\w-]{3,40}$/.test(name)) {
                    return 'Use 3-40 characters, letters, numbers, hyphens, and underscores. No spaces or other characters.'
                  }
                  return undefined
                }
              ]}
              validateOn='submit'
              // style={{ width: '100%' }}
            >
              <StyledTextInput
                id='tag-name'
                name='tag-name'
                onChange={handleChange}
                value={newTagName}
              />
            </StyledFormField>
            <StyledButton
              label='Add'
              type='submit'
            />
          </Box>
        </Form>
      </Box>
    </Modal>
  )
}

export default AddTagModal
