import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import CollectionsModal from '@shared/components/CollectionsModal'
import MetaToolsButton from '../MetaToolsButton'
import CollectionsButton from './CollectionsButton'
import CollectionsIcon from './CollectionsIcon'

describe('Component > CollectionsButton', function () {
  let wrapper
  const subject = {
    favorite: false,
    id: '12345',
    locations: [
      { 'image/jpeg': 'https://somedomain/photo.jpg' }
    ],
    toggleFavourite: () => false
  }

  before(function () {
    wrapper = shallow(<CollectionsButton subject={subject} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should display a Collect icon', function () {
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<CollectionsIcon color='dark-5' size='1em' />)
  })

  describe('on click', function () {
    let onClick
    let collectionsModal

    before(function () {
      onClick = sinon.stub()
      wrapper = mount(
        <CollectionsButton
          onClick={onClick}
          subject={subject}
        />
      )
      collectionsModal = wrapper.find(CollectionsModal).instance().wrappedInstance
      sinon.stub(collectionsModal, 'open')
      sinon.stub(console, 'error')
    })

    afterEach(function () {
      collectionsModal.open.resetHistory()
      onClick.resetHistory()
    })

    after(function () {
      console.error.restore()
    })

    it('should open a collections modal', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(collectionsModal.open.withArgs(subject.id)).to.have.been.calledOnce()
    })

    it('should call props.onClick', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(onClick).to.have.been.calledOnce()
    })
  })

  describe('when disabled', function () {
    let onClick
    let collectionsModal

    before(function () {
      onClick = sinon.stub()
      wrapper = mount(
        <CollectionsButton
          disabled
          onClick={onClick}
          subject={subject}
        />
      )
      collectionsModal = wrapper.find(CollectionsModal).instance().wrappedInstance
      sinon.spy(collectionsModal, 'open')
    })

    afterEach(function () {
      collectionsModal.open.resetHistory()
      onClick.resetHistory()
    })

    it('should not open a collections modal', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(collectionsModal.open).to.not.have.been.called()
    })

    it('should not be clickable', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(onClick).to.not.have.been.called()
    })
  })
})
