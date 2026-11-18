import { Box, FormField, Menu, RadioButtonGroup, Text, TextInput } from 'grommet'
import { More } from 'grommet-icons'
import { arrayOf, func, oneOf, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'
import styled from 'styled-components'

import SectionLabel from '../SectionLabel'

const RoleOptions = styled(RadioButtonGroup)`
  flex-wrap: wrap;
`

function CollaboratorsSection({ collaborators, onRemoveCollaborator, onRoleChange }) {
  const { t } = useTranslation('screens')

  const roleOptions = [
    { label: t(`Collection.CollectionSettingsModal.fullCollaborator`), value: 'collaborator' },
    { label: t('Collection.roles.contributor'), value: 'contributor' },
    { label: t('Collection.roles.viewer'), value: 'viewer' }
  ]

  return (
    <Box border={{ side: 'top', color: 'light-5' }} gap='small' pad={{ top: 'small' }}>
      <SectionLabel>
        {t(`Collection.CollectionSettingsModal.collaborators`)}
      </SectionLabel>
      <FormField
        htmlFor='collection-settings-search'
        label={(
          <Text color={{ dark: 'neutral-6', light: 'dark-5' }} size='12px'>
            {t(`Collection.CollectionSettingsModal.searchUsers`)}
          </Text>
        )}
        margin='none'
      >
        <TextInput disabled id='collection-settings-search' />
      </FormField>
      {collaborators.length > 0 && (
        <Box as='ul' border={{ color: 'light-5' }} margin='none' pad='small' round='xsmall'>
          {collaborators.map(collaborator => (
            <Box
              align='center'
              as='li'
              direction='row'
              gap='small'
              justify='between'
              key={collaborator.id}
              pad={{ vertical: 'xsmall' }}
              wrap
            >
              <Box direction='row' gap='xsmall' wrap>
                <Text size='small'>{collaborator.display_name}</Text>
                <Text color={{ dark: 'light-3', light: 'dark-3' }} size='small'>@{collaborator.login}</Text>
              </Box>
              <Box align='center' direction='row' gap='small' wrap>
                <RoleOptions
                  aria-label={t(`Collection.CollectionSettingsModal.rolesFor`, { name: collaborator.display_name })}
                  direction='row'
                  disabled={!onRoleChange}
                  name={`collection-settings-role-${collaborator.id}`}
                  onChange={event => onRoleChange?.(collaborator.id, event.target.value)}
                  options={roleOptions}
                  value={collaborator.role}
                />
                <Menu
                  a11yTitle={t(`Collection.CollectionSettingsModal.collaboratorMenu`, { name: collaborator.display_name })}
                  disabled={!onRemoveCollaborator}
                  icon={<More />}
                  items={[{
                    label: t(`Collection.CollectionSettingsModal.removeCollaborator`),
                    onClick: () => onRemoveCollaborator?.(collaborator.id)
                  }]}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

CollaboratorsSection.propTypes = {
  collaborators: arrayOf(shape({
    display_name: string.isRequired,
    id: string.isRequired,
    login: string.isRequired,
    role: oneOf(['collaborator', 'contributor', 'viewer']).isRequired
  })).isRequired,
  onRemoveCollaborator: func,
  onRoleChange: func
}

export default CollaboratorsSection
