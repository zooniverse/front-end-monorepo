import { Modal, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Form, FormField, TextInput } from 'grommet'
import { useTranslation } from 'next-i18next'
import { arrayOf, bool, func, shape, string } from 'prop-types'
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

  const { t } = useTranslation('screens')

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
      title={t('Talk.Tags.addATag')}
      titleColor='black'
    >
      <Box
        gap='xsmall'
        width='600px'
      >
        <SpacedText size='small'>
          {t('Talk.Tags.popularTagsFrom', { projectDisplayName })}
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
              label={<SpacedText>{t('Talk.Tags.createTag')}</SpacedText>}
              name='tag-name'
              validate={[
                (name) => {
                  if (!name || name && !/^[\w-]{3,40}$/.test(name)) {
                    return t('Talk.Tags.tagValidationMessage')
                  }
                  return undefined
                }
              ]}
              validateOn='submit'
            >
              <StyledTextInput
                id='tag-name'
                name='tag-name'
                onChange={handleChange}
                value={newTagName}
              />
            </StyledFormField>
            <StyledButton
              label={t('Talk.Tags.add')}
              type='submit'
            />
          </Box>
        </Form>
      </Box>
    </Modal>
  )
}

AddTagModal.propTypes = {
  active: bool,
  disabled: bool,
  onClose: func.isRequired,
  onTagClick: func,
  projectDisplayName: string,
  tags: arrayOf(
    shape({
      id: string,
      name: string
    })
  )
}

export default AddTagModal
