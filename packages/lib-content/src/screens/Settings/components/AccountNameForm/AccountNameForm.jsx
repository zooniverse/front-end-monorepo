import { Form } from 'grommet'

export default function AccountNameForm ({ user }) {
  if (!user) return null

  return (
    <Form>
      <p>User is {user.login} aka {user.display_name}</p>
    </Form>
  )
}