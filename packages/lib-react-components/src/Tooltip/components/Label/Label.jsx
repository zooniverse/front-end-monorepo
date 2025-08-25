import { array, bool, node, object, oneOf, oneOfType, shape, string } from 'prop-types'
import { Box } from 'grommet'
import { withTheme } from 'styled-components'

import SpacedText from '../../../SpacedText'
import Triangle from '../Triangle'

function Label ({ animation = 'fadeIn', arrow = true, className = '', label, theme, ...rest }) {

  // Optional Chaining with a default param is necessary here to handle shallow rendered specs in lib-classifier
  // In an app env, there will always be a Grommet theme wrapper
  const family = theme?.global?.font?.family || ''

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
  'data-placement': oneOf([ 'bottom', 'top' ]),
  label: oneOfType([ string, node ]).isRequired,
  theme: shape({
    global: shape({
      font: shape({
        family: string
      })
    })
  })
}

export default withTheme(Label)
