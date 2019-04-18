function groupPeople (ungroupedPeople) {
  return ungroupedPeople.reduce((acc, person) => {
    const matchTeam = obj => obj.name === person.team

    let teamIndex = acc.findIndex(matchTeam)

    if (teamIndex === -1) {
      acc.push({
        name: person.team,
        people: [],
      })
      teamIndex = acc.length - 1
    }

    acc[teamIndex].people.push(person)

    return acc
  }, [])
}

export default groupPeople
