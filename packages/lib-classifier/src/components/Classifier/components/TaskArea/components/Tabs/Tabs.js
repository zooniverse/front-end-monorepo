import { Tabs } from 'grommet'
import styled from 'styled-components'

const StyledTabs = styled(Tabs)`
  height: 100%;
  max-height: 570px;

  > div[role="tabpanel"] {
    height: 100%;
  }
`

export default StyledTabs
