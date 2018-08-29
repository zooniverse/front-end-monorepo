import { Tabs } from 'grommet'
import styled from 'styled-components'

import getTabColor from './getTabColor'

const StyledTabs = styled(Tabs)`
  border-bottom: 0
  margin: 0

  ~ div[role="tabpanel"] {
    background-color: ${getTabColor('activeBackground')}
    border: 1px solid ${getTabColor('border')}
    border-top: 0
    color: ${getTabColor('color')}
    padding: 1rem
  }
`

export default StyledTabs
