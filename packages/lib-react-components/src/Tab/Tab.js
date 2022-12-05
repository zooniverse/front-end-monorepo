import { Tab as GrommetTab } from 'grommet'

import SpacedText from '../SpacedText'

function Tab (props) {
  const clonedProps = { ...props }

  if (typeof clonedProps.title === 'string') {
    clonedProps.title = (
      <SpacedText size='medium' weight='bold'>
        {clonedProps.title}
      </SpacedText>
    )
  }

  return <GrommetTab {...clonedProps} />
}

export default Tab
