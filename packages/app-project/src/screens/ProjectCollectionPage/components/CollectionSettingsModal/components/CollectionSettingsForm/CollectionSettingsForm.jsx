import { Anchor, Box, Button, FormField, RadioButtonGroup, Text, TextArea, TextInput, ThemeContext } from 'grommet'
import { Trash } from 'grommet-icons'
import { arrayOf, bool, func, oneOf, shape, string } from 'prop-types'
import { useState } from 'react'
import { useTranslation } from 'next-i18next/pages'
import styled from 'styled-components'

import SectionLabel from '../SectionLabel'

const DESCRIPTION_LIMIT = 300

const formTheme = {
  formField: {
    border: { color: 'light-5', side: 'all' },
    label: { margin: { horizontal: 'none' } },
    round: '4px'
  }
}

const DeleteButton = styled(Button)`
  color: ${props => props.theme.global.colors[props.theme.dark ? 'accent-4' : 'neutral-4']};
  font-size: 16px;
  font-weight: normal;
  text-transform: uppercase;
`

const ActionButtons = styled(Box)`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
`

const ActionButton = styled(Button)`
  border: 1px solid ${props => props.theme.global.colors[props.theme.dark ? 'accent-1' : 'neutral-1']};
  border-radius: 4px;
  font-size: 16px;
  font-weight: normal;
  min-height: 40px;
  padding: 6px 12px;

  &:disabled {
    opacity: 0.4;
  }
`

const DoneButton = styled(ActionButton)`
  background: ${props => props.theme.global.colors[props.theme.dark ? 'accent-1' : 'neutral-1']};
  color: ${props => props.theme.global.colors[props.theme.dark ? 'black' : 'white']};
`

function CollectionSettingsForm({
  collection,
  collectionUrl,
  collaborators,
  onClose,
  onDelete,
  onRemoveCollaborator,
  onRoleChange,
  onSubmit
}) {
  const { t } = useTranslation('screens')
  const [name, setName] = useState(collection.display_name)
  const [description, setDescription] = useState(collection.description || '')
  const [isPrivate, setIsPrivate] = useState(collection.private)

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit?.({
      display_name: name,
      description,
      private: isPrivate
    })
  }

  function handleDescriptionKeyDown(event) {
    // Grommet's TextArea stops Escape from reaching the modal's layer.
    if (event.key === 'Escape') onClose()
  }

  const visibilityOptions = [
    {
      label: <Text>{t(`Collection.CollectionSettingsModal.private`)} - <Text size='small'>{t(`Collection.CollectionSettingsModal.privateHelp`)}</Text></Text>,
      value: 'private'
    },
    {
      label: <Text>{t(`Collection.CollectionSettingsModal.public`)} - <Text size='small'>{t(`Collection.CollectionSettingsModal.publicHelp`)}</Text></Text>,
      value: 'public'
    }
  ]

  return (
    <ThemeContext.Extend value={formTheme}>
      <Box as='form' flex={false} gap='medium' onSubmit={handleSubmit}>
        <Box gap='xsmall'>
          <FormField
            htmlFor='collection-settings-name'
            label={(
              <SectionLabel>
                {t(`Collection.CollectionSettingsModal.name`)}
              </SectionLabel>
            )}
            margin='none'
            required
          >
            <TextInput
              id='collection-settings-name'
              onChange={event => setName(event.target.value)}
              required
              value={name}
            />
          </FormField>
          <Text size='small'>{t(`Collection.CollectionSettingsModal.nameHelp`)}</Text>
          {collectionUrl && (
            <Text size='small'>
              {t(`Collection.CollectionSettingsModal.url`)}{' '}
              <Anchor href={collectionUrl} label={collectionUrl} />
            </Text>
          )}
        </Box>

        <Box gap='xsmall'>
          <FormField
            htmlFor='collection-settings-description'
            label={(
              <>
                <SectionLabel>
                  {t(`Collection.CollectionSettingsModal.description`)}
                </SectionLabel>
                {' '}
                <Text
                  color={{ dark: 'neutral-6', light: 'dark-5' }}
                  margin={{ left: 'xsmall' }}
                  size='12px'
                  weight={300}
                >
                  {t(`Collection.CollectionSettingsModal.optional`)}
                </Text>
              </>
            )}
            margin='none'
          >
            <TextArea
              id='collection-settings-description'
              maxLength={DESCRIPTION_LIMIT}
              onChange={event => setDescription(event.target.value)}
              onKeyDown={handleDescriptionKeyDown}
              rows={4}
              value={description}
            />
          </FormField>
          <Text size='small'>
            {t(`Collection.CollectionSettingsModal.descriptionRemaining`, { count: Math.max(0, DESCRIPTION_LIMIT - description.length) })}
          </Text>
        </Box>

        <Box gap='xsmall'>
          <SectionLabel>
            {t(`Collection.CollectionSettingsModal.coverSubject`)}
          </SectionLabel>
          <Text size='small'>{t(`Collection.CollectionSettingsModal.coverDescription`)}</Text>
        </Box>

        <Box gap='xsmall'>
          <SectionLabel>
            {t(`Collection.CollectionSettingsModal.visibility`)}
          </SectionLabel>
          <RadioButtonGroup
            aria-label={t(`Collection.CollectionSettingsModal.visibility`)}
            name='collection-settings-visibility'
            onChange={event => setIsPrivate(event.target.value === 'private')}
            options={visibilityOptions}
            value={isPrivate ? 'private' : 'public'}
          />
        </Box>

        <DeleteButton
          alignSelf='start'
          disabled={!onDelete}
          gap='10px'
          icon={<Trash aria-hidden='true' color='currentColor' size='16px' />}
          label={t(`Collection.CollectionSettingsModal.delete`)}
          onClick={onDelete}
          plain
          type='button'
        />
        <ActionButtons>
          <ActionButton disabled label={t(`Collection.CollectionSettingsModal.addCollaborator`)} />
          <DoneButton disabled={!onSubmit} label={t(`Collection.CollectionSettingsModal.done`)} primary type='submit' />
        </ActionButtons>
      </Box>
    </ThemeContext.Extend>
  )
}

CollectionSettingsForm.propTypes = {
  collection: shape({
    description: string,
    display_name: string.isRequired,
    private: bool.isRequired
  }).isRequired,
  collectionUrl: string,
  collaborators: arrayOf(shape({
    display_name: string.isRequired,
    id: string.isRequired,
    login: string.isRequired,
    role: oneOf(['collaborator', 'contributor', 'viewer']).isRequired
  })),
  onClose: func.isRequired,
  onDelete: func,
  onRemoveCollaborator: func,
  onRoleChange: func,
  onSubmit: func
}

export default CollectionSettingsForm
