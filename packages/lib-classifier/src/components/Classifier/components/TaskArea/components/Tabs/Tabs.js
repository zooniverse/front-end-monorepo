import { Tabs } from 'grommet'
import styled from 'styled-components'

import { pxToRem } from '@zooniverse/react-components'

const StyledTabs = styled(Tabs)`
  max-height: ${pxToRem(570)};
`

export default StyledTabs
