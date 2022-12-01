import styled from 'styled-components'
import { Blank } from 'grommet-icons'

const StyledBlank = styled(Blank)`
  circle {
    fill: ${props => props.theme.dark ? 'black' : 'white'};
    stroke: ${props => props.theme.dark ? 'white' : 'black'};
  }

  path {
    fill: ${props => props.theme.dark ? 'white' : 'black'};
  }
`

export default function InvertIcon (props) {
  return (
    <StyledBlank viewBox='0 0 32 32' {...props}>
      <circle cx='16' cy='16' r='12' />
      <path d='M15.6,4c6.6,0,12,5.4,12,12s-5.4,12-12,12' />
    </StyledBlank>
  )
}
