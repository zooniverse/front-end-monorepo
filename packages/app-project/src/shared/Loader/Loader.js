import PropTypes from 'prop-types'
import { Bars } from 'svg-loaders-react'
import { Box } from 'grommet'
import { withTheme } from 'styled-components'

function Loader(props) {
  const {
    background = '',
    color = '',
    height = 'xxsmall',
    margin = '',
    pad = '',
    theme: {
      global: {
        colors
      }
    },
    width = 'xxsmall'
  } = props
  const loaderColor = color || colors.brand

  return (
    <Box
      align='center'
      background={background}
      justify='center'
      height={height}
      margin={margin}
      pad={pad}
      width={width}
    >
      <Box height='xxsmall' width='xxsmall'>
        <Bars
          fill={loaderColor}
          height='80%'
          viewBox='0 0 135 140'
          width='100%'
        />
      </Box>
    </Box>
  )
}

Loader.propTypes = {
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  color: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  width: PropTypes.string
}

export default withTheme(Loader)
export { Loader }