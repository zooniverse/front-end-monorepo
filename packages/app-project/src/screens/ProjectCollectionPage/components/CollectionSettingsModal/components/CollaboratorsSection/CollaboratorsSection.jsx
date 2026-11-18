import { Box, FormField, Menu, RadioButtonGroup, Text, TextInput, ThemeContext } from 'grommet'
import { More } from 'grommet-icons'
import { Tooltip } from '@zooniverse/react-components'
import { arrayOf, func, oneOf, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'

import SectionLabel from '../SectionLabel'

const radioTheme = { radioButton: { gap: 'xsmall' } }

function CollaboratorsSection({ collaborators, onRemoveCollaborator, onRoleChange }) {
  const { t } = useTranslation('screens')

  const roleOptions = [
    {
      label: (
        <Tooltip label={t('Collection.roles.collaboratorDescription')}>
          <Text size='12px'>{t('Collection.CollectionSettingsModal.fullCollaborator')}</Text>
        </Tooltip>
      ),
      value: 'collaborator'
    },
    {
      label: (
        <Tooltip label={t('Collection.roles.contributorDescription')}>
          <Text size='12px'>{t('Collection.roles.contributor')}</Text>
        </Tooltip>
      ),
      value: 'contributor'
    },
    {
      label: (
        <Tooltip label={t('Collection.roles.viewerDescription')}>
          <Text size='12px'>{t('Collection.roles.viewer')}</Text>
        </Tooltip>
      ),
      value: 'viewer'
    }
  ]

  return (
    <Box border={{ side: 'top', color: { dark: 'dark-5', light: 'light-5' } }} gap='small' pad={{ top: 'small' }}>
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
        <Box
          as='ul'
          background={{ dark: 'transparent', light: 'white' }}
          border={{ color: { dark: 'dark-5', light: 'light-5' }, size: 'xsmall' }}
          gap='15px'
          margin='none'
          pad={{ horizontal: '10px', vertical: '15px' }}
          round='4px'
        >
          {collaborators.map(collaborator => (
            <Box
              key={collaborator.id}
              align='center'
              as='li'
              direction='row'
              gap='small'
              fill='horizontal'
              justify='between'
              wrap
            >
              <Box align='start' basis='100px' direction='column' flex={{ grow: 1, shrink: 1 }} gap='xxsmall' justify='start'>
                <Text color={{ dark: 'white', light: 'black' }} size='12px'>{collaborator.display_name}</Text>
                <Text color={{ dark: 'light-5', light: 'dark-4' }} size='12px'>@{collaborator.login}</Text>
              </Box>
              <Box align='center' direction='row' flex={false} gap='15px' justify='end' wrap>
                <ThemeContext.Extend value={radioTheme}>
                  <RadioButtonGroup
                    aria-label={t(`Collection.CollectionSettingsModal.rolesFor`, { name: collaborator.display_name })}
                    direction='row'
                    gap='15px'
                    disabled={!onRoleChange}
                    name={`collection-settings-role-${collaborator.id}`}
                    onChange={event => onRoleChange?.(collaborator.id, event.target.value)}
                    options={roleOptions}
                    value={collaborator.role}
                  />
                </ThemeContext.Extend>
                <Menu
                  a11yTitle={t(`Collection.CollectionSettingsModal.collaboratorMenu`, { name: collaborator.display_name })}
                  disabled={!onRemoveCollaborator}
                  icon={<More size='16px' />}
                  margin='none'
                  dropProps={{ align: { top: 'bottom', right: 'right' } }}
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
