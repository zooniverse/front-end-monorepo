import { flow, getRoot, types } from 'mobx-state-tree'

import asyncStates from '@zooniverse/async-states'

import Person from './Person'
import groupPeople from './helpers/groupPeople'

const Team = types
  .model('Team', {
    activeFilter: types.optional(types.string, ''),
    allPeople: types.array(Person),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized)
  })

  .views(self => ({
    get currentView () {
      const { activeFilter, groupedPeople } = self
      const filterTeams = team => team.name === activeFilter

      return (activeFilter)
        ? groupedPeople.filter(filterTeams)
        : groupedPeople
    },

    get filters () {
      const { groupedPeople } = self
      const teams = groupedPeople.map(team => team.name)
      return [...new Set(teams)]
    },

    get groupedPeople () {
      const { allPeople } = self
      return groupPeople(allPeople)
    }
  }))

  .actions(self => {
    let contentfulClient

    return {
      afterAttach () {
        contentfulClient = getRoot(self).contentfulClient
      },

      fetch: flow(function * fetchPeople () {
        if (self.loadingState === asyncStates.loading ||
          self.loadingState === asyncStates.success) {
          return null
        }

        const contentfulClient = getRoot(self).contentfulClient

        self.loadingState = asyncStates.loading

        const response = yield contentfulClient.getEntries({
          content_type: 'person',
          include: 2,
          limit: 500
        })

        self.loadingState = asyncStates.success
        response.items.forEach(item => {
          self.allPeople.push({
            team: item.fields.team.fields.name,
            id: item.sys.id,
            bio: item.fields.bio,
            name: item.fields.name,
            twitterId: item.fields.twitterId,
            jobTitle: item.fields.jobTitle
          })
        })
      }),

      setActiveFilter (team) {
        if (['', ...self.filters].includes(team)) {
          self.activeFilter = team
        }
      }
    }
  })

export default Team
