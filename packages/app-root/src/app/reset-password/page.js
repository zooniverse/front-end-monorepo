import ResetPasswordContainer from './ResetPasswordContainer.js'

export const metadata = {
  title: 'Reset Password',
  description: ''
}

export default async function ResetPasswordPage (props) {

  // Check if there's a ?reset_password_token=1234567890 in the URL's query
  // string. If yes, it means the user clicked a link in an "Unsubscribe Me Pls"
  // email sent by Panoptes.

  const searchParams = await props.searchParams
  const resetPasswordToken = searchParams?.['reset_password_token']

  return (
    <ResetPasswordContainer
      resetPasswordToken={resetPasswordToken}
    />
  )
}
