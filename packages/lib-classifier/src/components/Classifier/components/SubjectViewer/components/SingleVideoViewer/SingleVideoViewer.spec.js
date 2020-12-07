import React from 'react'
import { shallow } from 'enzyme'

import SingleVideoViewer from './SingleVideoViewer'

let wrapper

describe('Component > SingleVideoViewer', function() {
	beforeEach(function() {
		wrapper = shallow(
			<SingleVideoViewer height={200} width={100} viewBox='0 0 100 100' />
		)
	})

	it('should render without crashing', function() {
		expect(wrapper).to.be.ok()
	})
})
