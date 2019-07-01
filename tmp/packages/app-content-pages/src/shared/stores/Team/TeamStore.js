import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'

import Team from './Team'
import Person from './Person'
import pluckPersonData from './helpers/pluckPersonData'
import pluckTeamData from './helpers/pluckTeamData'
import sortEntriesByName from './helpers/sortEntriesByName'
import pluckContentType from '../helpers/pluckContentType'
import sortEntriesByWeight from '../helpers/sortEntriesByWeight'

const TeamStore = types
  .model('TeamStore', {
    teams: types.array(Team),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    people: types.array(Person),
    response: types.frozen(),
    selectedTeam: types.maybeNull(types.reference(Team))
  })

  .views(self => ({
    isActiveTeam (teamId) {
      return (self.selectedTeam)
        ? self.selectedTeam.id === teamId
        : false
    },

    get uiData () {
      let teams = self.selectedTeam ? [self.selectedTeam] : self.teams

      if (!self.selectedTeam || self.selectedTeam.name !== 'Alumni') {
        teams = teams.filter(team => team.name !== 'Alumni')
      }

      return teams.map(team => Object.assign({}, team, {
        people: team.people.map(p => Object.assign({}, p))
      }))
    },

    get uiFilters () {
      const filters = self.teams.map(team => ({
        active: self.isActiveTeam(team.id),
        name: team.name,
        selectTeam: self.selectTeam.bind(this, team.id)
      }))

      filters.unshift({
        active: !self.selectedTeam,
        name: 'Show All',
        selectTeam: self.selectTeam.bind(this, null)
      })

      return filters
    }
  }))

  .actions(self => ({
    fetch: flow(function * fetchTeam () {
      if (self.people.length > 0 ||
        self.loadingState === asyncStates.loading ||
        self.loadingState === asyncStates.success) {
        return null
      }

      const contentfulClient = getRoot(self).contentfulClient

      self.loadingState = asyncStates.loading

      try {
        const response = yield contentfulClient.getEntries({
          content_type: 'person',
          include: 2,
          limit: 500
        })

        self.processTeams(response)
        self.processPeople(response)

        self.loadingState = asyncStates.success
        self.response = response
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }),

    processTeams (response) {
      const teams = response.includes.Entry
        .filter(entry => pluckContentType(entry) === 'team')
        .sort(sortEntriesByWeight)
        .map(pluckTeamData)
      self.teams.replace(teams)
    },

    processPeople (response) {
      const personEntries = response.items
        .sort(sortEntriesByName)
      const people = personEntries.map(pluckPersonData)
        .map(person => ({
          ...person,
          avatarSrc: person.avatarSrc ? person.avatarSrc + '?w=160&h=160' : undefined
        }))

      self.people.replace(people)
      personEntries.forEach(personEntry => {
        const personId = personEntry.sys.id
        const teamId = personEntry.fields.team.sys.id
        const team = self.teams.find(t => t.id === teamId)
        if (team) {
          team.people.push(personId)
        }
      })
    },

    selectTeam (teamId) {
      self.selectedTeam = teamId
    }
  }))

export default TeamStore
