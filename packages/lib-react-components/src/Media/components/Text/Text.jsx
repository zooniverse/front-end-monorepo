import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'
import { useTextData } from '../../../hooks'
import PreDisplay from '../PreDisplay'

export default function Text({
  alt = defaultProps.alt,
  controls = defaultProps.controls,
  flex = defaultProps.flex,
  height = '200',
  src = defaultProps.src,
  width = defaultProps.width,
  ...rest
}) {
  const { data, error, loading } = useTextData(src)
  let content = null

  if (loading) {
    content = null
  }

  if (error) {
    content = <p>{error.message}</p>
  }

  if (data) {
    content = data
  }

  return <PreDisplay
    a11yTitle={alt}
    content={content}
    flex={flex}
    maxHeight={height}
    maxWidth={width}
    {...rest}
  />
}

Text.propTypes = {
  ...propTypes
}
