export function legacyDropdownAdapter(snapshot) {
  const newSnapshot = {}
  const { selects } = snapshot
  if (selects?.length === 1) {
    const menu = selects[0]
    newSnapshot.allowCreate = menu.allowCreate
    newSnapshot.help = snapshot.help
    newSnapshot.instruction = snapshot.instruction
    newSnapshot.required = menu.required
    newSnapshot.taskKey = snapshot.taskKey
    newSnapshot.type = 'dropdown-simple'
    const options = menu.options['*']
    newSnapshot.options = options.map(option => option.label)
    return newSnapshot
  }
  return snapshot
}