import { Box, Button, Form, FormField, RadioButtonGroup, Select, TextInput, ThemeContext } from 'grommet'
import { func, node, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import FieldLabel from './components/FieldLabel'
import RadioInputLabel from './components/RadioInputLabel'
import formTheme from './theme'

const StyledButton = styled(Button)`
  border-radius: 4px;
`

const PRIVATE_STATS_VISIBILITY = [
  {
    label: `No, don't show individual stats to members`,
    value: 'private_agg_only',
  },
  {
    label: 'Yes, show individual stats to members',
    value: 'private_show_agg_and_ind',
  }
]

const PUBLIC_STATS_VISIBILITY = [
  {
    label: 'No, never show individual stats',
    value: 'public_agg_only',
  },
  {
    label: 'Yes, show individual stats if member',
    value: 'public_agg_show_ind_if_member',
  },
  {
    label: 'Yes, always show individual stats',
    value: 'public_show_all',
  }
]

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
          label={<FieldLabel>Group Name</FieldLabel>}
          help={defaultValue?.id ? null : 'By creating a new Group you will become the admin.'}
          htmlFor='display_name'
          name='display_name'
          required
          validate={[
            (name) => {
              if (name && name.length < 4) return 'must be > 3 characters'
              if (name && name.length > 60) return 'must be < 60 characters'
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
          label={<FieldLabel>Public Visibility</FieldLabel>}
          htmlFor='visibility'
          name='visibility'
        >
          <RadioButtonGroup
            name='visibility'
            options={[
              {
                label: <>
                  <RadioInputLabel color={{ dark: 'neutral-6', light: 'neutral-7' }} size='1rem'>Private</RadioInputLabel>
                  <span style={{ whiteSpace: 'pre' }}>{' - '}</span>
                  <RadioInputLabel>only members can view this group</RadioInputLabel>
                </>,
                value: 'Private'
              },
              {
                label: <>
                  <RadioInputLabel color={{ dark: 'neutral-6', light: 'neutral-7' }} size='1rem'>Public</RadioInputLabel>
                  <span style={{ whiteSpace: 'pre' }}>{' - '}</span>
                  <RadioInputLabel>you can share this group with anyone</RadioInputLabel>
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
          label={<FieldLabel>Show Individual Stats</FieldLabel>}
          help='Admin can always see individual stats.'
          htmlFor='stats_visibility'
          info={defaultValue.id ? null : 'You can add all other members via a Join Link after creating the new group below.'}
          name='stats_visibility'
        >
          <Select
            id='stats_visibility'
            aria-label='Stats Visibility'
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
              if (window.confirm('Are you sure you want to delete this group?')) {
                handleDelete()
              }
            }}
          >
            Deactivate Group
          </button>
        ) : null}
        <StyledButton
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          label={defaultValue?.id ? 'Save changes' : 'Create new group'}
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
