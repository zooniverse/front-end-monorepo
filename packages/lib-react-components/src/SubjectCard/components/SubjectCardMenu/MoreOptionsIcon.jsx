import { Blank } from 'grommet-icons'
import styled from 'styled-components'

const StyledBlank = styled(Blank)`
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));

  circle {
    fill: white;
    stroke: #a6a7a9;
    stroke-width: 1;
  }
`

export default function MoreOptionsIcon(props) {
  return (
    <StyledBlank
      viewBox='0 0 37 22'
      {...props}
    >
      <circle cx='11' cy='10' r='2.5' />
      <circle cx='18.5' cy='10' r='2.5' />
      <circle cx='26' cy='10' r='2.5' />
    </StyledBlank>
  )
}
