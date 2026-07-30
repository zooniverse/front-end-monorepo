import ResetPassword from './ResetPassword'

export default {
  title: 'Other / Reset Password',
  component: ResetPassword
}

export const Default = {
  args: {
    resetPasswordToken: ''
  }
}

export const WithResetPasswordToken = {
  args: {
    resetPasswordToken: '1234567890'
  }
}
