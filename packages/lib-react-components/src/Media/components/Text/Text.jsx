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
    content = <PreDisplay content={data} maxHeight={height} maxWidth={width} {...rest} />
  }

  return content
}

Text.propTypes = {
  ...propTypes
}

Text.propTypes = {
  ...propTypes
}
