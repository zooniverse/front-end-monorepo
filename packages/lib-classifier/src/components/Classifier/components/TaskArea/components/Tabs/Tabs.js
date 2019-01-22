import { Tabs } from 'grommet'
import styled from 'styled-components'
import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'
import getTabColor from './getTabColor'

const StyledTabs = styled(Tabs)`
  border: 1px solid;
  border-color: ${theme('mode', {
    dark: zooTheme.dark.colors.tabs.border,
    light: zooTheme.light.colors.tabs.border
  })};
  margin: 0;

  ~ div[role="tabpanel"] {
    background-color: ${getTabColor('activeBackground')};
    color: ${getTabColor('color')};
    padding: 1rem;
  }
`

export default StyledTabs
