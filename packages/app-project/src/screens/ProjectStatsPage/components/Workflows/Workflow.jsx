import { useTranslation } from 'next-i18next'
import { number, shape, string } from 'prop-types'
import { Box, Heading, Text } from 'grommet'

function Workflows({ workflow }) {
  const { t } = useTranslation('screens')

  return (
    <Box border={{ color: 'light-5' }}>
      <Box height='10px' width='100%'>
        <Box height='10px' background='neutral-2' width='50%' />
      </Box>
      <Box
        pad={{ bottom: '40px', horizontal: '20px', top: '30px' }}
        direction='row'
        justify='between'
        align='center'
      >
        <Heading level={4} size='1rem' margin='none' weight={600}>
          {workflow.displayName}
        </Heading>
        <Box direction='row'>
          <Text>This is the stats content</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Workflows

Workflows.propTypes = {
  workflow: shape({
    completeness: number, // 0 to 1
    displayName: string,
    retirement: shape({
      criteria: string,
      options: shape({
        count: number
      })
    }),
    retired_set_member_subjects_count: number,
    subjects_count: number
  })
}
