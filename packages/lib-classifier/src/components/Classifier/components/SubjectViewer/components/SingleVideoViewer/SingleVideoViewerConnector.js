import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import SingleVideoViewerContainer from './SingleVideoViewerContainer'

function useStores() {
	const stores = React.useContext(MobXProviderContext)

	const { active: subject } = stores.classifierStore.subjects

	return {
		subject
	}
}

function SingleVideoViewerConnector(props) {
	const { subject } = useStores()

	return <SingleVideoViewerContainer subject={subject} {...props} />
}

export default observer(SingleVideoViewerConnector)
