import { Box, Button, Form, FormField, RadioButtonGroup, Select, TextInput } from 'grommet'
import { func, shape, string } from 'prop-types'
import { useState } from 'react'

const DEFAULT_HANDLER = () => true

const STATS_VISIBILITY = [
  'private_agg_only',
  'private_show_agg_and_ind',
  'public_agg_only',
  'public_agg_show_ind_if_member',
  'public_show_all'
]

const DEFAULT_VALUE = {
  display_name: '',
  stats_visibility: 'private_agg_only'
}

function GroupForm({
  handleSubmit = DEFAULT_HANDLER,
  defaultValue = DEFAULT_VALUE
}) {
  const [value, setValue] = useState(defaultValue)

  return (
    <Box>
      <Form
        onChange={(nextValue, { touched }) => {
          setValue(nextValue)
        }}
        onSubmit={handleSubmit}
        value={value}
      >
        <FormField
          label='Group Name'
          htmlFor='display_name'
          name='display_name'
        >
          <TextInput
            id='display_name'
            name='display_name'
          />
        </FormField>
        <FormField
          label='Stats Visibility'
          htmlFor='stats_visibility'
          name='stats_visibility'
        >
          <Select
            id='stats_visibility'
            aria-label='Stats Visibility'
            name='stats_visibility'
            options={STATS_VISIBILITY}
          />
        </FormField>
        <Box>
          <Button
            type='submit'
          >
            Create new group
          </Button>
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
