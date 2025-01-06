import { Box, Button, Form, FormField, RadioButtonGroup, Select, TextInput, ThemeContext } from 'grommet'
import { func, node, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from '../../../translations/i18n.js'

import FieldLabel from './components/FieldLabel'
import RadioInputLabel from './components/RadioInputLabel'
import formTheme from './theme'

const StyledButton = styled(Button)`
  border-radius: 4px;
`

const DEFAULT_HANDLER = () => true

const DEFAULT_VALUE = {
  display_name: '',
  visibility: 'Private',
  stats_visibility: 'private_agg_only'
}

function GroupForm({
  children,
  defaultValue = DEFAULT_VALUE,
  handleDelete = DEFAULT_HANDLER,
  handleSubmit = DEFAULT_HANDLER
}) {
  const { t } = useTranslation()

  const PRIVATE_STATS_VISIBILITY = [
    {
      label: t('GroupForm.privateAggOnly'),
      value: 'private_agg_only',
    },
    {
      label: t('GroupForm.privateShowAggAndInd'),
      value: 'private_show_agg_and_ind',
    }
  ]

  const PUBLIC_STATS_VISIBILITY = [
    {
      label: t('GroupForm.publicAggOnly'),
      value: 'public_agg_only',
    },
    {
      label: t('GroupForm.publicAggShowInd'),
      value: 'public_agg_show_ind_if_member',
    },
    {
      label: t('GroupForm.publicShowAll'),
      value: 'public_show_all',
    }
  ]

  const [value, setValue] = useState(defaultValue)
  const statsVisibilityOptions = value.visibility === 'Private' ? PRIVATE_STATS_VISIBILITY : PUBLIC_STATS_VISIBILITY

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <Form
      onChange={(nextValue, { touched }) => {
        if (nextValue.visibility !== value.visibility) {
          const statsVisibility = nextValue.visibility === 'Private' ? 'private_agg_only' : 'public_agg_only'
          nextValue.stats_visibility = statsVisibility
        }
        setValue(nextValue)
      }}
      onSubmit={handleSubmit}
      value={value}
    >
      <ThemeContext.Extend value={{
        formField: {
          ...formTheme.formField,
          border: {
            color: 'light-5',
            side: 'all'
          }
        }
      }}>
        <FormField
          label={<FieldLabel>{t('GroupForm.name')}</FieldLabel>}
          help={defaultValue?.id ? null : t('GroupForm.nameHelp')}
          htmlFor='display_name'
          name='display_name'
          required
          validate={[
            (name) => {
              if (name && name.length < 4) return t('GroupForm.greaterThanChar')
              if (name && name.length > 60) return t('GroupForm.lessThanChar')
              return undefined
            }
          ]}
          validateOn='blur'
        >
          <TextInput
            id='display_name'
            name='display_name'
          />
        </FormField>
      </ThemeContext.Extend>
      <ThemeContext.Extend value={formTheme}>
        <FormField
          label={<FieldLabel>{t('GroupForm.pubVis')}</FieldLabel>}
          htmlFor='visibility'
          name='visibility'
        >
          <RadioButtonGroup
            name='visibility'
            options={[
              {
                label: <>
                  <RadioInputLabel color={{ dark: 'neutral-6', light: 'neutral-7' }} size='1rem'>{t('GroupForm.private')}</RadioInputLabel>
                  <span style={{ whiteSpace: 'pre' }}>{' - '}</span>
                  <RadioInputLabel>{t('GroupForm.onlyMembers')}</RadioInputLabel>
                </>,
                value: 'Private'
              },
              {
                label: <>
                  <RadioInputLabel color={{ dark: 'neutral-6', light: 'neutral-7' }} size='1rem'>{t('GroupForm.public')}</RadioInputLabel>
                  <span style={{ whiteSpace: 'pre' }}>{' - '}</span>
                  <RadioInputLabel>{t('GroupForm.anyone')}</RadioInputLabel>
                </>,
                value: 'Public'
              }
            ]}
          />
        </FormField>
      </ThemeContext.Extend>
      <ThemeContext.Extend value={{
        formField: {
          ...formTheme.formField,
          border: {
            color: 'light-5',
            side: 'all'
          }
        }
      }}>
        <FormField
          label={<FieldLabel>{t('GroupForm.showInd')}</FieldLabel>}
          help={t('GroupForm.showIndHelp')}
          htmlFor='stats_visibility'
          info={defaultValue.id ? null : t('GroupForm.showIndInfo')}
          name='stats_visibility'
        >
          <Select
            id='stats_visibility'
            aria-label={t('GroupForm.visibility')}
            labelKey='label'
            name='stats_visibility'
            options={statsVisibilityOptions}
            valueKey={{ key: 'value', reduce: true }}
          />
        </FormField>
      </ThemeContext.Extend>
        {children}
      <Box
        direction='row'
        justify={defaultValue?.id ? 'between' : 'end'}
      >
        {defaultValue?.id ? (
          <button
            onClick={(event) => {
              event.preventDefault()
              if (window.confirm(t('GroupForm.deactivateHelp'))) {
                handleDelete()
              }
            }}
          >
            {t('GroupForm.deactivate')}
          </button>
        ) : null}
        <StyledButton
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          label={defaultValue?.id ? t('GroupForm.saveChanges') : t('GroupForm.createNew')}
          primary
          type='submit'
        />
      </Box>
    </Form>
  )
}

GroupForm.propTypes = {
  children: node,
  handleDelete: func,
  handleSubmit: func,
  defaultValue: shape({
    display_name: string,
    stats_visibility: string
  })
}

export default GroupForm
