import { inject, observer } from 'mobx-react'
import { array, string } from 'prop-types'
import React, { Component } from 'react'

import RecentSubjects from './RecentSubjects'

function storeMapper (stores) {
  const { project, recents: { recents } } = stores.store
  return {
    recents,
    projectName: project['display_name'],
    slug: project.slug
  }
}

class RecentSubjectsContainer extends Component {
  render () {
    const { recents, projectName, slug } = this.props
    return (
      <RecentSubjects
        recents={recents.slice(0,3)}
        projectName={projectName}
        slug={slug}
      />
    )
  }
}

RecentSubjectsContainer.propTypes = {
  recents: array,
  projectName: string
}

@inject(storeMapper)
@observer
class DecoratedRecentSubjectsContainer extends RecentSubjectsContainer { }

export default DecoratedRecentSubjectsContainer

export { RecentSubjectsContainer }
