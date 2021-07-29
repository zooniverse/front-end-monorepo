import { inject, observer } from 'mobx-react'
import { Component } from 'react'
import { string } from 'prop-types'

import QuickTalk from './QuickTalk'

function storeMapper (stores) {
  const projectSlug = stores.store.project.slug
  
  return { projectSlug }
}

@inject(storeMapper)
@observer
class QuickTalkContainer extends Component {
  render () {
    const { projectSlug, subjectID } = this.props
    
    return (
      <div>
        [{projectSlug}] [{subjectID}]
        <QuickTalk
          projectSlug
          subjectID
        />
      </div>
    )
  }
}

QuickTalkContainer.propTypes = {
  projectSlug: string,
  subjectID: string,
}

export default QuickTalkContainer
