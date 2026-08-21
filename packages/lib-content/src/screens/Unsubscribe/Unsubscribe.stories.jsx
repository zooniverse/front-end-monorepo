import Unsubscribe from './Unsubscribe'

export default {
  title: 'Other / Unsubscribe',
  component: Unsubscribe
}

export const Default = {
  args: {
    processed: false
  }
}

export const AfterRedirectFromPanoptes = {
  args: {
    processed: true
  }
}
