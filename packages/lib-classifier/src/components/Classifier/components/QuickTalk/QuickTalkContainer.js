import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import QuickTalk from './QuickTalk'

function storeMapper (stores) {
  const {
    active: subject
  } = stores.classifierStore.subjects
  
  return {
    subject
  }
}

class QuickTalkContainer extends React.Component {
  constructor () {
    super()
  }
    
  render () {
    const {
      subject,
    } = this.props

    if (!subject) {
      return (<div>NOTHING</div>)
    }
    
    return (
      <QuickTalk
        subject={subject}
      />
    )
  }
}

QuickTalkContainer.propTypes = {
  subject: PropTypes.object,
}

QuickTalkContainer.defaultProps = {
  subject: undefined,
}

@inject(storeMapper)
@observer
class DecoratedQuickTalkContainer extends QuickTalkContainer { }

export default DecoratedQuickTalkContainer
export { QuickTalkContainer }
