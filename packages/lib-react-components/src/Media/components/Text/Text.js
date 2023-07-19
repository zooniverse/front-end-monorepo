import { Box } from 'grommet'
import { DocumentText } from 'grommet-icons'
import styled, { css } from 'styled-components'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

const StyledBox = styled(Box)`
  ${props => props.maxHeight && css`max-height: ${props.maxHeight}px;`}
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}px;`}
`

export default function Text({
  alt = defaultProps.alt,
  controls = defaultProps.controls,
  flex = defaultProps.flex,
  height = defaultProps.height,
  src = defaultProps.src,
  width = defaultProps.width,
  ...rest
}) {
  return (
    <StyledBox
      align='center'
      justify='center'
      flex={flex}
      height='100%'
      maxWidth={width}
      maxHeight={height}
      width='100%'
      {...rest}
    >
      <DocumentText
        a11yTitle={alt}
        size='large'
      />
    </StyledBox>
  )
}

Text.propTypes = {
  ...propTypes
}
