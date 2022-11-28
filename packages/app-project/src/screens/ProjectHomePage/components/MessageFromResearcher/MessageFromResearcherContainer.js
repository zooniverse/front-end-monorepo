import { inject, observer } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import { Component } from 'react'
import { get } from 'lodash'
import MessageFromResearcher from './MessageFromResearcher'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    project
  }
}

class MessageFromResearcherContainer extends Component {
  getMessage () {
    return this.props.project.researcher_quote
  }

  getResearcher () {
    const { project } = this.props
    const researcherId = project.configuration.researcherID
    const isUserId = /^\d+$/.test(researcherId)
    if (isUserId) {
      const user = project.owners.find(owner => owner.id === researcherId)
      if (user) {
        return user
      }
    }
    return undefined
  }

  getResearcherAvatar () {
    const { project } = this.props
    const researcher = this.getResearcher()
    let avatar

    if (project.researcher_quote) {
      avatar = researcher
        ? get(researcher, 'avatar_src')
        : get(project, 'avatar.src')
    }

    return avatar
  }

  getResearcherName () {
    const researcher = this.getResearcher()
    return (researcher && researcher.display_name)
      ? researcher.display_name
      : this.props.project.display_name
  }

  getTalkLink () {
    const { project } = this.props
    return `/projects/${project.slug}/talk`
  }

  render () {
    const { researcher_quote } = this.props.project

    return (
      <MessageFromResearcher
        avatar={this.getResearcherAvatar()}
        message={researcher_quote}
        researcher={this.getResearcherName()}
        talkLink={this.getTalkLink()}
      />
    )
  }
}

MessageFromResearcherContainer.propTypes = {
  project: shape({
    avatar: shape({
      avatar_src: string
    }),
    display_name: string,
    owners: arrayOf(shape({
      avatar_src: string,
      display_name: string
    })),
    researcher_quote: string,
    slug: string
  })
}

const WrappedMessageFromResearcherContainer = inject(storeMapper)(observer(MessageFromResearcherContainer))

export default WrappedMessageFromResearcherContainer
export { MessageFromResearcherContainer }
