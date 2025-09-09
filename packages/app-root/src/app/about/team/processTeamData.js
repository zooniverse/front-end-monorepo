import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

function processTeamData(data) {
  const people = sortBy(data.items, p => p.fields.name)

  const teams = people.reduce((acc, person) => {
    const team = get(person, 'fields.team.fields')

    if (!acc[team.name]) {
      acc[team.name] = {
        ...team,
        people: [],
      }
    }

    // Required fields
    const newPerson = {
      bio: get(person, 'fields.bio'),
      jobTitle: get(person, 'fields.jobTitle'),
      name: get(person, 'fields.name'),
    }

    // Optional field
    const avatarSrc = getAvatarSrc(person)
    if (avatarSrc) {
      newPerson.avatarSrc = avatarSrc
    }

    acc[team.name].people.push(newPerson)
    return acc
  }, {})

  return sortBy(Object.values(teams), t => t.weight)
}


function getAvatarSrc(person) {
  const avatarSrc = get(person, 'fields.avatar.fields.file.url')
  return avatarSrc ? avatarSrc + '?w=160&h=160' : undefined
}

export default processTeamData
