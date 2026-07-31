import ResetPassword from './ResetPassword'

export default {
  title: 'Other / Reset Password',
  component: ResetPassword
}

export const Default = {
  args: {
    isLoggedIn: false,
    resetPasswordToken: ''
  }
}

export const WithResetPasswordToken = {
  args: {
    isLoggedIn: false,
    resetPasswordToken: '1234567890'
  }
}

export const NoTokenButLoggedIn = {
  args: {
    isLoggedIn: true,
    resetPasswordToken: ''
  }
}