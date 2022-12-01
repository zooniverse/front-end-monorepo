import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { withTheme } from 'styled-components'
import SpacedText from '../../../SpacedText'
import Triangle from '../Triangle'

function Label ({ animation, arrow, className, label, theme, ...rest }) {
  const { family } = theme.global.font
  const placement = rest['data-placement'] // the attr from the render function of the tippy tooltip

  return (
    <Box 
      animation={animation}
    >
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

Label.defaultProps = {
  arrow: true,
  animation: 'fadeIn',
  className: '',
  'data-placement': 'top',
  theme: {
    global: {
      font: {
        family: ''
      }
    }
  }
}

Label.propTypes = {
  arrow: PropTypes.bool,
  animation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  className: PropTypes.string,
  label: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]).isRequired,
  'data-placement': PropTypes.oneOf([ 'bottom', 'top' ]),
  theme: PropTypes.shape({
    global: PropTypes.shape({
      font: PropTypes.shape({
        family: PropTypes.string
      })
    })
  })
}

export default withTheme(Label)
export { Label }
