import { useId } from 'react'
import { Form } from 'grommet'
import { useTranslation } from 'react-i18next'

import useTalkPreferences from '../../helpers/useTalkPreferences'

function TalkPreferenceForm ({
  authUser,
  ...rest
}) {
  const { t } = useTranslation()
  const { data: talkPreferences, isLoading, error: loadError, isValidating, mutate } = useTalkPreferences({ login: authUser?.login })

  return (
    <Form {...rest}>

      {isLoading && 'isLoading'} --

      {isValidating && 'isValidating'} --

      {loadError && 'loadError'}

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>category</th>
            <th>email_digest</th>
          </tr>
        </thead>
        <tbody>
          {talkPreferences?.map(tpref => (
            <tr key={tpref.id}>
              <td>{tpref.id}</td>
              <td>{tpref.category}</td>
              <td>{tpref.email_digest}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Form>
  )
}

export default TalkPreferenceForm