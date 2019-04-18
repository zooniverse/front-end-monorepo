import { flow, getRoot, types } from 'mobx-state-tree'
import { createClient } from 'contentful'
import asyncStates from '@zooniverse/async-states'

import Publication from './Publication'
import groupPublications from './helpers/groupPublications'

const Publications = types
  .model('Publications', {
    activeFilter: types.optional(types.string, ''),
    allPublications: types.array(Publication),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized)
  })

  .views(self => ({
    get currentView () {
      const { activeFilter, groupedPublications } = self
      const filterCategories = category => category.name === activeFilter

      return (activeFilter)
        ? groupedPublications.filter(filterCategories)
        : groupedPublications
    },

    get filters () {
      const { groupedPublications } = self
      const categories = groupedPublications.map(category => category.name)
      return [...new Set(categories)]
    },

    get groupedPublications () {
      const { allPublications } = self
      const groupedPublications = groupPublications(allPublications)
      return sortByWeight(groupedPublications)
    }
  }))

  .actions(self => {
    let contentfulClient

    return {
      afterAttach () {
        contentfulClient = getRoot(self).contentfulClient
      },

      fetch: flow(function * fetchPublications () {
        if (self.loadingState === asyncStates.loading ||
          self.loadingState === asyncStates.success) {
          return null
        }

        const contentfulClient = getRoot(self).contentfulClient

        self.loadingState = asyncStates.loading

        const response = yield contentfulClient.getEntries({
          content_type: 'publication',
          include: 2,
          limit: 500
        })

        self.loadingState = asyncStates.success

        response.items.forEach(item => {
          self.allPublications.push({
            category: {
              name: item.fields.project.fields.category.fields.name,
              weight: item.fields.project.fields.category.fields.weight
            },
            citation: item.fields.citation,
            date: item.fields.date,
            id: item.sys.id,
            project: {
              name: item.fields.project.fields.name,
              slug: item.fields.project.fields.slug || ''
            },
            url: item.fields.url || ''
          })
        })
      }),

      setActiveFilter (category) {
        if (['', ...self.filters].includes(category)) {
          self.activeFilter = category
        }
      }
    }
  })

export default Publications

function sortByWeight (array) {
  return array.sort((a, b) => a.weight - b.weight)
}
