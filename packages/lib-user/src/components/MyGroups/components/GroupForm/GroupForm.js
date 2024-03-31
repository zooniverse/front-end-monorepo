import { Box, Button, Form, FormField, RadioButtonGroup, Select, TextInput } from 'grommet'
import { func, shape, string } from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 4px;
`

const PRIVATE_STATS_VISIBILITY = [
  {
    label: 'No, never show individual stats',
    value: 'private_agg_only',
  },
  {
    label: 'Yes, always show individual stats',
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
  handleSubmit = DEFAULT_HANDLER,
  defaultValue = DEFAULT_VALUE
}) {
  const [value, setValue] = useState(defaultValue)
  const statsVisibilityOptions = value.visibility === 'Private' ? PRIVATE_STATS_VISIBILITY : PUBLIC_STATS_VISIBILITY

  return (
    <Box
      width={{ min: '600px' }}
    >
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
        <FormField
          label='Group Name'
          help='By creating a new Group you will become the admin.'
          htmlFor='display_name'
          name='display_name'
          required
          validate={[
            (name) => {
              if (name && name.length < 4) return 'must be > 3 characters';
              return undefined;
            }
          ]}
          validateOn='blur'
        >
          <TextInput
            id='display_name'
            name='display_name'
          />
        </FormField>
        <FormField
          label='Public Visibility'
          htmlFor='visibility'
          name='visibility'
        >
          <RadioButtonGroup
            name='visibility'
            options={[ 'Private', 'Public' ]}
          />
        </FormField>
        <FormField
          label='Show Individual Stats'
          help='Admin can always see individual stats.'
          htmlFor='stats_visibility'
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
        <Box
          direction='row'
          justify='end'
        >
          <StyledButton
            color='neutral-1'
            label='Create new group'
            primary
            type='submit'
          />
        </Box>
      </Form>
    </Box>
  )
}

GroupForm.propTypes = {
  handleSubmit: func,
  defaultValue: shape({
    display_name: string,
    stats_visibility: string
  })
}

export default GroupForm
