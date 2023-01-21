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
      <circle cx='16' cy='16' r='15' strokeWidth={1.5} />
      <path d='M16,1.5c6.6,0,15,5.4,15,15s-5.4,15-15,15' />
    </StyledBlank>
  )
}
