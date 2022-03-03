import PropTypes from 'prop-types'
import { Bars } from 'svg-loaders-react'
import { Box } from 'grommet'
import { withTheme } from 'styled-components'
import { useTranslation } from 'next-i18next'

function Loader(props) {
  const { t } = useTranslation('components')
  const {
    background = '',
    color = '',
    height = 'xxsmall',
    loadingMessage = t('Loader.loading'),
    margin = '',
    pad = '',
    theme: {
      global: {
        colors
      }
    },
    width = 'xxsmall',
    ...rest
  } = props
  const loaderColor = color || colors.brand

  return (
    <Box
      align='center'
      a11yTitle={loadingMessage}
      role='status'
      background={background}
      justify='center'
      height={height}
      margin={margin}
      pad={pad}
      width={width}
      {...rest}
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
  a11yTitle: PropTypes.string,
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  color: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  width: PropTypes.string
}

export default withTheme(Loader)
export { Loader }
