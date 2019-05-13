import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'
import get from 'lodash/get'

import Category from './Category'
import Project from './Project'
import Publication from './Publication'
import pluckCategoryData from './helpers/pluckCategoryData'
import pluckContentType from './helpers/pluckContentType'
import pluckProjectData from './helpers/pluckProjectData'
import pluckPublicationData from './helpers/pluckPublicationData'
import sortEntriesByTitle from './helpers/sortEntriesByTitle'
import sortEntriesByWeight from './helpers/sortEntriesByWeight'
import sortEntriesByYear from './helpers/sortEntriesByYear'

const Publications = types
  .model('Publications', {
    categories: types.array(Category),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    projects: types.array(Project),
    publications: types.array(Publication),
    response: types.frozen(),
    selectedCategory: types.maybeNull(types.reference(Category))
  })

  .views(self => ({
    isActiveCategory (categoryId) {
      return (self.selectedCategory)
        ? self.selectedCategory.id === categoryId
        : false
    },

    get panoptesIds () {
      return self.projects.map(project => project.panoptesId)
        .filter(v => v)
    },

    get uiData () {
      const categories = self.selectedCategory
        ? [self.selectedCategory]
        : self.categories

      return categories.map(category => Object.assign({}, category, {
        projects: category.projects
          .map(p => Object.assign({}, p, {
            publications: p.publications.map(pub => Object.assign({}, pub))
          }))
      }))
    },

    get uiFilters () {
      const filters = self.categories
        .map(category => {
          const { id, slug } = category
          return {
            active: self.isActiveCategory(id),
            selectCategory: self.selectCategory.bind(this, id),
            slug
          }
        })

      filters.unshift({
        active: !self.selectedCategory,
        selectCategory: self.selectCategory.bind(this, null),
        slug: 'showAll'
      })

      return filters
    }
  }))

  .actions(self => {
    let contentfulClient
    let panoptesClient

    return {
      afterAttach () {
        contentfulClient = getRoot(self).contentfulClient
        panoptesClient = getRoot(self).panoptesClient
      },

      fetch: flow(function * fetchPublications () {
        if (self.publications.length > 0 ||
          self.loadingState === asyncStates.loading ||
          self.loadingState === asyncStates.success) {
          return null
        }

        const contentfulClient = getRoot(self).contentfulClient

        self.loadingState = asyncStates.loading

        try {
          const response = yield contentfulClient.getEntries({
            content_type: 'publication',
            include: 2,
            limit: 500
          })

          self.processCategories(response)
          self.processProjects(response)
          self.processPublications(response)

          if (self.projects.length) {
            yield self.fetchAvatars()
          }

          self.loadingState = asyncStates.success
          self.response = response
        } catch (error) {
          const servername = get(error, 'response.res.client.servername')
          if (servername && servername.includes('panoptes')) {
            console.error('Error fetching avatars from Panoptes,', error.response.statusCode)
          } else {
            console.error(error)
            self.loadingState = asyncStates.error
          }
        }
      }),

      fetchAvatars: flow(function * fetchAvatars () {
        const panoptesClient = getRoot(self).panoptesClient
        const panoptesIds = self.panoptesIds.join(',')

        const params = {
          query: {
            cards: true,
            id: panoptesIds,
            page_size: 100
          }
        }
        const response = yield panoptesClient.projects.get(params)
        self.processAvatars(response)
      }),

      linkEntryToParent (entry, entryType, parentType) {
        const entryId = entry.sys.id
        entry.fields[parentType]
          .map(value => value.sys.id)
          .forEach(parentId => {
            const parent = self[parentType].find(value => value.id === parentId)
            if (parent) {
              parent[entryType].push(entryId)
            }
          })
      },

      processAvatars (response) {
        response.body.projects.forEach(r => {
          const project = self.projects.find(p => p.title === r.display_name)
          if (project) {
            project.avatarSrc = r.avatar_src
          }
        })
      },

      processCategories (response) {
        const categories = response.includes.Entry
          .filter(entry => pluckContentType(entry) === 'category')
          .sort(sortEntriesByWeight)
          .map(pluckCategoryData)
        self.categories.replace(categories)
      },

      processProjects (response) {
        const projectEntries = response.includes.Entry
          .filter(entry => pluckContentType(entry) === 'project')
          .sort(sortEntriesByTitle)

        const projects = projectEntries.map(pluckProjectData)
        self.projects.replace(projects)

        projectEntries.forEach(entry =>
          self.linkEntryToParent(entry, 'projects', 'categories'))
      },

      processPublications (response) {
        const publicationEntries = response.items.sort(sortEntriesByYear)
        const publications = publicationEntries.map(pluckPublicationData)
        self.publications.replace(publications)
        publicationEntries.forEach(entry =>
          self.linkEntryToParent(entry, 'publications', 'projects'))
      },

      selectCategory (categoryId) {
        self.selectedCategory = categoryId
      }
    }
  })

export default Publications
