import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import MessageFromResearcher from './MessageFromResearcher'

// Right now we're just using dummy data, but message_from_researcher and
// other props should eventually come from the store.
function storeMapper (stores) {
  const { project } = stores.store
  return {
    projectName: project.display_name
  }
}

@inject(storeMapper)
@observer
class MessageFromResearcherContainer extends Component {
  render () {
    const { message, socialUsername, socialLink, avatar } = this.props

    return (
      <MessageFromResearcher
        message={message}
        socialUsername={socialUsername}
        socialLink={socialLink}
        avatar={avatar}
      />
    )
  }
}

MessageFromResearcherContainer.propTypes = {
  message: string,
  socialUsername: string,
  socialLink: string,
  avatar: string
}

MessageFromResearcherContainer.defaultProps = {
  message:
    'The data is finally here! Together we can find the most complex, most unusual, and the most exciting stuff in the galexy',
  socialUsername: '@this.zooniverse',
  socialLink: 'https://www.instagram.com/the.zooniverse/',
  avatar: 'https://www.fillmurray.com/g/375/270'
}

export default MessageFromResearcherContainer
