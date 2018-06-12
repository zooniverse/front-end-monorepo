import { shallow } from 'enzyme'
import React from 'react'
import SingleImageViewer from './SingleImageViewer'
import subjects from 'test/fixtures/subjects'

const subject = subjects.body.subjects[0]

describe('Component > SingleImageViewer', function () {
  it('should render without crashing', function () {
    shallow(<SingleImageViewer subject={subject} />)
  })
})
