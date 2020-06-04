import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import SpacedText from '../../../SpacedText'
import { withTheme } from 'styled-components'

function Label ({ className, label, theme }) {
  const { family } = theme.global.font
  return (
    <Box
      background={{ color: 'black', dark: true }}
      className={className}
      elevation='medium'
      pad={{ horizontal: 'medium', vertical: 'xsmall' }}
      responsive={false}
    >
      <SpacedText css={`font-family: ${family};`} weight='bold'>{label}</SpacedText>
    </Box>
  )
}

Label.defaultProps = {
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