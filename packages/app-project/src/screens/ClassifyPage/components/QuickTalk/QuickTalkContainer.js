import { inject, observer } from 'mobx-react'
import { Component } from 'react'

import QuickTalk from './QuickTalk'

function storeMapper (stores) {
  return {}
}

@inject(storeMapper)
@observer
class QuickTalkContainer extends Component {
  render () {
    return (
      <QuickTalk />
    )
  }
}

QuickTalkContainer.propTypes = {}

export default QuickTalkContainer
