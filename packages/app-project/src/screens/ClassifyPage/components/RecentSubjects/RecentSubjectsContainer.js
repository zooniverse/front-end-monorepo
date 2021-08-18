import { inject, observer } from 'mobx-react'
import { array, bool, number, string } from 'prop-types'
import { Component } from 'react'

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

function RecentSubjectsContainer({
  isLoggedIn = false,
  recents = [],
  projectName = '',
  size = 3,
  slug
}) {
  return (
    <RecentSubjects
      isLoggedIn={isLoggedIn}
      recents={recents.slice(0, size)}
      projectName={projectName}
      size={size}
      slug={slug}
    />
  )
}

RecentSubjectsContainer.propTypes = {
  /** Is the volunteer logged in, for favourites and collections. */
  isLoggedIn: bool,
  /** The project name. */
  projectName: string,
  /** Recent classification subjects from Panoptes. */
  recents: array,
  /** The number of previews to show. */
  size: number,
  /** Project URL slug for links. */
  slug: string.isRequired
}

@inject(storeMapper)
@observer
class DecoratedRecentSubjectsContainer extends RecentSubjectsContainer { }

export default DecoratedRecentSubjectsContainer

export { RecentSubjectsContainer }
