const withRequireUserLoggedInStoreMock = {
	user: {
		isLoggedIn: true
	}
}

const withRequireUserLoggedOutStoreMock = {
	user: {
		isLoggedIn: false
	}
}

const withRequireUserText = 'With Require User'

function withRequireUserStubComponent () {
	return <p>{withRequireUserText}</p>
}

export {
	withRequireUserLoggedOutStoreMock,
	withRequireUserLoggedInStoreMock,
	withRequireUserText,
	withRequireUserStubComponent
}
