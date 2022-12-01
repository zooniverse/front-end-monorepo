/* eslint
  func-names: 0,
  import/no-extraneous-dependencies: ["error", { "devDependencies": true }]
  prefer-arrow-callback: 0,
  "react/jsx-boolean-value": ["error", "always"]
*/

import { shallow } from 'enzyme';
import { expect } from 'chai'
import TaskInputLabel from './TaskInputLabel'
import { Markdownz } from '@zooniverse/react-components'

const label = 'test label'

describe('TaskInputLabel', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskInputLabel />)
    expect(wrapper).to.be.ok()
  })

  it('should render Markdownz', function () {
    const wrapper = shallow(<TaskInputLabel />)
    expect(wrapper.find(Markdownz)).to.have.lengthOf(1)
  })

  it('should use props.label as the innerHTML text', function () {
    const wrapper = shallow(<TaskInputLabel label={label} />)
    expect(wrapper.contains(label)).to.be.true()
  })

  it('should not render props.labelIcon if not defined', function () {
    const wrapper = shallow(<TaskInputLabel label={label} />)
    expect(wrapper.find('span#icon')).to.have.lengthOf(0)
  })

  it('should not render props.labelStatus if not defined', function () {
    const wrapper = shallow(<TaskInputLabel label={label} />)
    expect(wrapper.find('div#status')).to.have.lengthOf(0)
  })

  it('should render props.labelIcon if defined', function () {
    const wrapper = shallow(<TaskInputLabel label={label} labelIcon={<span id='icon' />} />)
    expect(wrapper.find('span#icon')).to.have.lengthOf(1)
  })

  it('should render props.labelStatus if defined', function () {
    const wrapper = shallow(<TaskInputLabel label={label} labelStatus={<div id='status' />} />)
    expect(wrapper.find('div#status')).to.have.lengthOf(1)
  })
})
