import { array, bool, node, object, oneOf, oneOfType, shape, string } from 'prop-types'
import { Box } from 'grommet'
import { useTheme } from 'styled-components'

import SpacedText from '../../../SpacedText'
import Triangle from '../Triangle'

function Label ({ animation = 'fadeIn', arrow = true, className = '', label, ...rest }) {
  const { global } = useTheme()
  const { family } = global.font

  // the attr from the render function of the tippy tooltip
  const placement = rest['data-placement'] || 'top'

  return (
    <Box animation={animation}>
      {arrow && placement === 'bottom' &&
        <Triangle color='black' pointDirection='up' width={10} height={10} />}
      <Box
        background={{ color: 'black', dark: true }}
        className={className}
        elevation='medium'
        pad={{ horizontal: 'medium', vertical: 'xsmall' }}
        responsive={false}
      >
        <SpacedText css={`font-family: ${family};`} weight='bold'>{label}</SpacedText>
      </Box>
      {arrow && placement === 'top' &&
        <Triangle color='black' pointDirection='down' width={10} height={10} />}
    </Box>
  )
}


Label.propTypes = {
  arrow: bool,
  animation: oneOfType([
    string,
    array,
    object
  ]),
  className: string,
  label: oneOfType([ string, node ]).isRequired,
  'data-placement': oneOf([ 'bottom', 'top' ])
}

export default Label
