import { Heading } from 'grommet'
import styled from 'styled-components'

import { mobileBreakpoint } from '../SharedStyledComponents/SharedStyledComponents.jsx'

const StyledSubHeading = styled(Heading)`
  font-size: 2rem;

  @media (width <= ${mobileBreakpoint}) {
    font-size: 1.5rem;
  }
`

function SubHeading({ children }) {
  return (
    <StyledSubHeading
      level={3}
      margin='0'
      textAlign='center'
      weight='normal'
      fill
    >
      {children}
    </StyledSubHeading>
  )
}

export default SubHeading
