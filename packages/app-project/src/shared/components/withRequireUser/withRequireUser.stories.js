import { Provider } from 'mobx-react'
import withRequireUser from './withRequireUser'
import { 
	withRequireUserLoggedInStoreMock,
	withRequireUserLoggedOutStoreMock,
	withRequireUserStubComponent
} from './withRequireUser.mock'

const WithRequireUser = withRequireUser(withRequireUserStubComponent)

export default {
	title: 'Project App / Shared / withRequireUser',
	component: WithRequireUser
}

export const LoggedIn = () => (
	<Provider store={withRequireUserLoggedInStoreMock}>
		<WithRequireUser />
	</Provider>
)

export const LoggedOut = () => (
	<Provider store={withRequireUserLoggedOutStoreMock}>
		<WithRequireUser />
	</Provider>
)
