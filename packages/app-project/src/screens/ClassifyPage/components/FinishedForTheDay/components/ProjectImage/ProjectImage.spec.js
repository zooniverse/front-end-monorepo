import { shallow } from 'enzyme'
import React from 'react'

import ProjectImage from './ProjectImage'

let wrapper

const projectName = 'Foobar'
const imageSrc = 'foobar.jpg'

describe('Component > ProjectImage', function () {
  before(function () {
    wrapper = shallow(<ProjectImage imageSrc={imageSrc} projectName={projectName} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
