import { panoptes } from '@zooniverse/panoptes-js'

export default async function fetchUsers(query) {
  let usersAccumulator = []

  async function getUsers(page = 1) {
    try {
      const response = await panoptes.get('/users', { page, ...query })

      const { meta, users } = response?.body || {}

      if (users && users.length) {
        usersAccumulator = usersAccumulator.concat(users)
      }

      if (meta?.users?.next_page) {
        return getUsers(meta.users.next_page)
      }

      return usersAccumulator
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  await getUsers(1)
  return usersAccumulator
}
