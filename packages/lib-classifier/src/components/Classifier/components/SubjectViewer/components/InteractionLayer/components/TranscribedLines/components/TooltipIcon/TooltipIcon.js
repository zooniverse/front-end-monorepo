import { string } from 'prop-types'
import { Blank } from 'grommet-icons'

export default function TooltipIcon ({ fill }) {
  return (
    <Blank color={fill}>
      <circle cx='12' cy='12' r='6' />
    </Blank>
  )
}

TooltipIcon.propTypes = {
  fill: string
}