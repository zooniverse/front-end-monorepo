import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { withTheme } from 'styled-components'
import SpacedText from '../../../SpacedText'
import Triangle from '../Triangle'

function Label ({ animation, arrow, className, label, theme }) {
  const { family } = theme.global.font
  return (
    <Box 
      animation={animation}
    >
      <Box
        background={{ color: 'black', dark: true }}
        className={className}
        elevation='medium'
        pad={{ horizontal: 'medium', vertical: 'xsmall' }}
        responsive={false}
      >
        <SpacedText css={`font-family: ${family};`} weight='bold'>{label}</SpacedText>
      </Box>
      {arrow &&
        <Triangle data-popper-arrow="" color='black' pointDirection='down' width={10} height={10} />}
    </Box>
  )
}

Label.defaultProps = {
  arrow: true,
  animation: 'fadeIn',
  className: '',
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
  label: PropTypes.string.isRequired,
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