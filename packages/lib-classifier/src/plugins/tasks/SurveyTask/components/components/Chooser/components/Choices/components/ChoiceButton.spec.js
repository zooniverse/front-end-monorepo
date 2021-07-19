import { mount } from 'enzyme'
import { Grommet, Text } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import { Media } from '@zooniverse/react-components'

import { ChoiceButton, THUMBNAIL_ASPECT_RATIO } from './ChoiceButton'

describe('Component > ChoiceButton', function () {
  let wrapper, onChooseSpy, onKeyDownSpy

  before(function () {
    onChooseSpy = sinon.spy()
    onKeyDownSpy = sinon.spy()
    wrapper = mount(
      <ChoiceButton
        choiceId='cat-1'
        choiceLabel='cat'
        onChoose={onChooseSpy}
        onKeyDown={onKeyDownSpy}
        src='cat.jpg'
      />, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      }
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the choice label', function () {
    expect(wrapper.find(Text).contains('cat')).to.be.true()
  })

  it('should call onChoose on click of the button', function () {
    wrapper.simulate('click')
    expect(onChooseSpy).to.have.been.calledOnceWith('cat-1')
    onChooseSpy.resetHistory()
  })

  it('should call onKeyDown on keyDown of the button', function () {
    const backspaceEventMock = { key: 'Backspace', preventDefault: sinon.spy() }
    wrapper.simulate('keydown', backspaceEventMock)
    expect(onKeyDownSpy).to.have.been.calledOnceWith('cat-1')
  })

  it('should not render a thumbnail', function () {
    expect(wrapper.find(Media)).to.have.lengthOf(0)
  })

  describe('when disabled', function () {
    before(function () {
      wrapper.setProps({ disabled: true })
    })

    it('should not be clickable', function () {
      wrapper.simulate('click')
      expect(onChooseSpy).to.not.have.been.called()
      onChooseSpy.resetHistory()
    })
  })

  describe('when there is a small thumbnail', function () {
    let media
    before(function () {
      wrapper.setProps({ thumbnailSize: 'small' })
      media = wrapper.find(Media)
    })

    it('should render a thumbnail', function () {
      expect(media).to.have.lengthOf(1)
      expect(media.props().src).to.equal('cat.jpg')
    })

    it('should set the height of the thumbnail', function () {
      expect(media.props().height).to.equal(21)
    })

    it('should calculate the width based on the height using set aspect ratio', function () {
      expect(media.props().width).to.equal(Math.round(21 * THUMBNAIL_ASPECT_RATIO))
    })
  })

  describe('when there is a medium thumbnail', function () {
    let media
    before(function () {
      wrapper.setProps({ thumbnailSize: 'medium' })
      media = wrapper.find(Media)
    })

    it('should render a thumbnail', function () {
      expect(media).to.have.lengthOf(1)
      expect(media.props().src).to.equal('cat.jpg')
    })

    it('should set the height of the thumbnail', function () {
      expect(media.props().height).to.equal(42)
    })

    it('should calculate the width based on the height using set aspect ratio', function () {
      expect(media.props().width).to.equal(Math.round(42 * THUMBNAIL_ASPECT_RATIO))
    })
  })

  describe('when there is a large thumbnail', function () {
    let media
    before(function () {
      wrapper.setProps({ thumbnailSize: 'large' })
      media = wrapper.find(Media)
    })

    it('should render a thumbnail', function () {
      expect(media).to.have.lengthOf(1)
      expect(media.props().src).to.equal('cat.jpg')
    })

    it('should set the height of the thumbnail', function () {
      expect(media.props().height).to.equal(84)
    })

    it('should calculate the width based on the height using set aspect ratio', function () {
      expect(media.props().width).to.equal(Math.round(84 * THUMBNAIL_ASPECT_RATIO))
    })
  })
})
