import PropTypes from 'prop-types'
import { Bars } from 'svg-loaders-react'
import { Box } from 'grommet'
import { withTheme } from 'styled-components'
import { useTranslation } from 'next-i18next'

const isServer = typeof window === 'undefined'

function Loader({
  background = '',
  color = '',
  height = 'xxsmall',
  loadingMessage = '',
  margin = '',
  pad = '',
  theme: {
    global: {
      colors
    }
  },
  width = 'xxsmall',
  ...rest
}) {
  const { t } = useTranslation('components')
  const loaderColor = color || colors.brand

  if (isServer) {
    return null
  }

  return (
    <Box
      align='center'
      a11yTitle={loadingMessage || t('Loader.loading')}
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
