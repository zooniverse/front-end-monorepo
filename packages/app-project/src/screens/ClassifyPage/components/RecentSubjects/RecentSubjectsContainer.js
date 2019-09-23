import { inject, observer } from 'mobx-react'
import { array, bool, number, string } from 'prop-types'
import React, { Component } from 'react'

import RecentSubjects from './RecentSubjects'

function storeMapper (stores) {
  const { project, recents: { recents }, user: { isLoggedIn } } = stores.store
  return {
    isLoggedIn,
    recents,
    projectName: project['display_name'],
    slug: project.slug
  }
}

class RecentSubjectsContainer extends Component {
  render () {
    const { isLoggedIn, recents, projectName, size, slug } = this.props
    return (
      <RecentSubjects
        isLoggedIn={isLoggedIn}
        recents={recents.slice(0, size)}
        projectName={projectName}
        slug={slug}
      />
    )
  }
}

RecentSubjectsContainer.propTypes = {
  isLoggedIn: bool,
  recents: array,
  projectName: string,
  size: number
}

RecentSubjectsContainer.defaultProps = {
  isLoggedIn: false,
  recents: [],
  projectName: '',
  size: 3
}

@inject(storeMapper)
@observer
class DecoratedRecentSubjectsContainer extends RecentSubjectsContainer { }

export default DecoratedRecentSubjectsContainer

export { RecentSubjectsContainer }
