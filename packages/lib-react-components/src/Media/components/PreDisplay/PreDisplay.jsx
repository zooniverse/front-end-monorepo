import { Box } from 'grommet'
import styled, { css, useTheme } from 'styled-components'

const StyledBox = styled(Box)`
  ${props => props.maxHeight && css`max-height: ${props.maxHeight}px;`}
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}px;`}
`

const StyledPre = styled.pre`
  white-space: pre-wrap;
  color: ${props => props.theme.dark ? 'white' : 'black'};
  font-family: 'Anonymous Pro', monospace;
  font-weight: 400;
  @font-face {
    font-family: 'Anonymous Pro';
    font-style: normal;
    font-weight: 400;
    src:
      local('Anonymous Pro'),
      local('Anonymous Pro-Regular'),
      url(https://fonts.gstatic.com/s/anonymouspro/v21/rP2Bp2a15UIB7Un-bOeISG3pHls29QP-4Ks.woff2) 
      format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  overflow-y: scroll;
`

function PreDisplay({
    a11yTitle,
    content,
    flex,
    maxHeight,
    maxWidth,
    ...rest
  }) {
  const theme = useTheme()

  return (
    <StyledBox
      a11yTitle={a11yTitle}
      flex={flex}
      forwardedAs='section'
      height='100%'
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      pad={{ horizontal: 'xsmall', top: 'xsmall', bottom: 'medium' }}
      width='100%'
      {...rest}
    >
      <StyledPre
        tabIndex='0'
        theme={theme}
      >
        {content}
      </StyledPre>
    </StyledBox>
  )
}

export default PreDisplay
