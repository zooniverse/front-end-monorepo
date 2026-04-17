import { useTranslation } from 'next-i18next'
import { arrayOf, number, shape, string } from 'prop-types'
import { Box } from 'grommet'

function Workflows({ completeness, displayName }) {
  const { t } = useTranslation('screens')

  return <Box>{displayName}</Box>
}

export default Workflows

Workflows.propTypes = {
  completeness: number,
  displayName: string
}
