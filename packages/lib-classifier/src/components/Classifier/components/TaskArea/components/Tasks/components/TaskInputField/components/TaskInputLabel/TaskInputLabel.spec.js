/* eslint
  func-names: 0,
  import/no-extraneous-dependencies: ["error", { "devDependencies": true }]
  prefer-arrow-callback: 0,
  "react/jsx-boolean-value": ["error", "always"]
*/

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import TaskInputLabel, { StyledTaskInputLabel } from './TaskInputLabel'

const label = 'test label'

describe('TaskInputLabel', function () {
  it('should render without crashing', function () {
    const wrapper = mount(<TaskInputLabel />)
    expect(wrapper).to.be.ok
  })

  it('should render a StyledTaskInputLabel', function () {
    const wrapper = mount(<TaskInputLabel />)
    expect(wrapper.find(StyledTaskInputLabel)).to.have.lengthOf(1)
  })

  xit('should use props.label as the innerHTML text', function () {
    const wrapper = mount(<TaskInputLabel label={label} />)
    // \n added by markdown
    expect(wrapper.text()).to.equal(`${label}\n`)
  })

  it('should not render props.labelIcon if not defined', function () {
    const wrapper = mount(<TaskInputLabel label={label} />)
    expect(wrapper.find('span#icon')).to.have.lengthOf(0)
  })

  it('should not render props.labelStatus if not defined', function () {
    const wrapper = mount(<TaskInputLabel label={label} />)
    expect(wrapper.find('div#status')).to.have.lengthOf(0)
  })

  it('should render props.labelIcon if defined', function () {
    const wrapper = mount(<TaskInputLabel label={label} labelIcon={<span id='icon' />} />)
    expect(wrapper.find('span#icon')).to.have.lengthOf(1)
  })

  it('should render props.labelStatus if defined', function () {
    const wrapper = mount(<TaskInputLabel label={label} labelStatus={<div id='status' />} />)
    expect(wrapper.find('div#status')).to.have.lengthOf(1)
  })
})
