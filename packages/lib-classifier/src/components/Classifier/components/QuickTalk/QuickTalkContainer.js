import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import QuickTalk from './QuickTalk'
import talkClient from 'panoptes-client/lib/talk-client'

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
  
  componentDidMount () {
    this.fetchComments()
  }
  
  componentDidUpdate (prevProps) {
    const props = this.props
    if (props.subject?.id !== prevProps.subject?.id) {
      this.fetchComments()
    }
    
  }
  
  fetchComments () {
    const subject = this.props?.subject
    if (!subject) {
      this.resetComments()
      return
    }
    
    console.log('+++ fetchComments')
  }
        
  resetComments () {
    // TODO
    console.log('+++ resetComments')
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
