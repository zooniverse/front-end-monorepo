import { inject, observer } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import MessageFromResearcher from './MessageFromResearcher'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    project
  }
}

function getResearcher ({ project }) {
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

function MessageFromResearcherContainer({ project }) {
  let message = project.researcher_quote
  let researcher = getResearcher({ project })
  let avatar = (message)
    ? (researcher?.avatar_src)
      ? researcher.avatar_src
      : project.avatar.src
    : null
  let researcherName = (researcher && researcher.display_name)
    ? researcher.display_name
    : project.display_name
  let talkLink = `/projects/${project.slug}/talk`

  return (
    <MessageFromResearcher
      avatar={avatar}
      message={message}
      researcher={researcherName}
      talkLink={talkLink}
    />
  )
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
