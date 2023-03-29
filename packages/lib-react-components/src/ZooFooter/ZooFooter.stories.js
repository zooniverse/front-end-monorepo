import ZooFooter from './ZooFooter'
import readme from './README.md'
import AdminCheckbox from '../AdminCheckbox'

export default {
  title: 'Components / ZooFooter',
  component: ZooFooter,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => <ZooFooter />

export const WithAdmin = () => {
  return (
    <ZooFooter adminContainer={<AdminCheckbox checked onChange={() => {}} />} />
  )
}
