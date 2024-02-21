import { Tabs as GrommetTabs, ThemeContext } from 'grommet'

import tabTheme from './theme'

function Tabs (props) {
  return (
    <ThemeContext.Extend value={tabTheme}>
      <GrommetTabs {...props} />
    </ThemeContext.Extend>
  )
}

export default Tabs
