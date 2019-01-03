import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Modal } from '@zooniverse/react-components'
import { DataTable } from 'grommet'

import MetadataModal from './MetadataModal'

const metadata = {
  id: '1',
  href: 'https://zooniverse.org',
  '#hidden': true,
  '!onlyTalk': false
}

describe('MetadataModal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    expect(wrapper).to.be.ok
  })

  it('should render a Modal', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    expect(wrapper.find(Modal)).to.have.lengthOf(1)
  })

  it('should render a Grommet DataTable', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    expect(wrapper.find(DataTable)).to.have.lengthOf(1)
  })

  it('should render the correct number of table rows', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    expect(wrapper.find(DataTable).props().data).to.have.lengthOf(Object.keys(metadata).length - 2)
  })

  it('should add the +tab+ prefix to metadata urls', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    const href = wrapper.find(DataTable).props().data[1]
    expect(href.value.props.children.includes('+tab+')).to.be.true
  })

  it('should not render metadata prefixed with # or !', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    wrapper.find(DataTable).props().data.forEach((datum) => {
      expect(datum.label.includes('#')).to.be.false
      expect(datum.label.includes('!')).to.be.false
    })
  })
})
