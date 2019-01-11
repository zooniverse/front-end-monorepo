import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { Image, Video } from 'grommet'
import Markdownz from './Markdownz'

const content = '# Zooniverse'

describe('<Markdownz />', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<Markdownz>{content}</Markdownz>)
  })

  it('renders without crashing', function () { })

  it('renders markdown', function () {
    expect(wrapper.find('h1')).to.have.lengthOf(1)
    expect(wrapper.html().includes('Zooniverse')).to.be.true
  })

  describe('#buildResourceURL', function () {
    let buildResourceURLSpy
    before(function () {
      buildResourceURLSpy = sinon.spy(Markdownz.prototype, 'buildResourceURL')
    })

    afterEach(function () {
      buildResourceURLSpy.resetHistory()
    })

    after(function () {
      buildResourceURLSpy.restore()
    })

    it('should return an empty string if symbol is not defined', function () {
      const url = wrapper.instance().buildResourceURL('srallen')
      expect(url).to.equal('')
    })

    it('should return an empty string if the resource is falsy, but the mention symbol is', function () {
      const url = wrapper.instance().buildResourceURL('', '@')
      expect(url).to.equal('')
    })

    describe('when the symbol is #', function () {
      it('should return the expected url with a search query param', function () {
        const resource = 'tigers'
        const baseURL = ''
        const expectedReturnValue = `${baseURL}/talk/search?query=${resource}`
        wrapper.instance().buildResourceURL(resource, '#')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
      })

      it('should return a url with the project slug if props.projectSlug is defined', function () {
        const resource = 'tigers'
        const projectSlug = 'zooniverse/snapshot-wakanda'
        const expectedReturnValue = `/projects/${projectSlug}/talk/tag/${resource}`
        wrapper.setProps({ projectSlug })
        wrapper.instance().buildResourceURL('tigers', '#')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
        wrapper.setProps({ projectSlug: '' })
      })

      it('should return a url with props.baseURI if defined', function () {
        const resource = 'tigers'
        const baseURI = 'https://classrooms.zooniverse.org'
        const expectedReturnValue = `${baseURI}/talk/search?query=${resource}`
        wrapper.setProps({ baseURI })
        wrapper.instance().buildResourceURL('tigers', '#')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
        wrapper.setProps({ baseURI: '' })
      })
    })

    describe('when the symbol is @', function () {
      it('should return a url for the user profile', function () {
        const resource = 'srallen'
        const expectedReturnValue = `/users/${resource}`
        wrapper.instance().buildResourceURL(resource, '@')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
      })

      it('should return a url with the project slug if props.projectSlug is defined', function () {
        const resource = 'srallen'
        const projectSlug = 'zooniverse/snapshot-wakanda'
        const expectedReturnValue = `/projects/${projectSlug}/users/${resource}`
        wrapper.setProps({ projectSlug })
        wrapper.instance().buildResourceURL(resource, '@')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
        wrapper.setProps({ projectSlug: '' })
      })

      it('should return a url with props.baseURI if defined', function () {
        const resource = 'srallen'
        const baseURI = 'https://classrooms.zooniverse.org'
        const expectedReturnValue = `${baseURI}/users/${resource}`
        wrapper.setProps({ baseURI })
        wrapper.instance().buildResourceURL(resource, '@')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
        wrapper.setProps({ baseURI: '' })
      })
    })

    describe('when the symbol is ^S', function () {
      it('should return an empty string if props.projectSlug is not defined', function () {
        const resource = '1245'
        const expectedReturnValue = ''
        wrapper.instance().buildResourceURL(resource, '^S')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
      })

      it('should return a url with the project slug if props.projectSlug is defined', function () {
        const resource = '1234'
        const projectSlug = 'zooniverse/snapshot-wakanda'
        const expectedReturnValue = `/projects/${projectSlug}/talk/subjects/${resource}`
        wrapper.setProps({ projectSlug })
        wrapper.instance().buildResourceURL(resource, '^S')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
        wrapper.setProps({ projectSlug: '' })
      })

      it('should return a url with props.baseURI if defined', function () {
        const resource = '1234'
        const baseURI = 'https://classrooms.zooniverse.org'
        const projectSlug = 'zooniverse/snapshot-wakanda'
        const expectedReturnValue = `${baseURI}/projects/${projectSlug}/talk/subjects/${resource}`
        wrapper.setProps({ baseURI, projectSlug })
        wrapper.instance().buildResourceURL(resource, '^S')
        expect(buildResourceURLSpy).to.have.been.calledOnce
        expect(buildResourceURLSpy).to.have.returned(expectedReturnValue)
        wrapper.setProps({ baseURI: '', projectSlug: '' })
      })
    })
  })

  describe('#shouldResourceBeLinkable', function () {
    let shouldResourceBeLinkableSpy
    before(function () {
      shouldResourceBeLinkableSpy = sinon.spy(Markdownz.prototype, 'shouldResourceBeLinkable')
    })
    afterEach(function () {
      shouldResourceBeLinkableSpy.resetHistory()
    })
    after(function () {
      shouldResourceBeLinkableSpy.restore()
    })

    it('should default to return true', function () {
      wrapper.instance().shouldResourceBeLinkable('tigers', '#')
      expect(shouldResourceBeLinkableSpy).to.have.returned(true)
    })

    it('should return true if the symbol is ^S and props.projectSlug is truthy', function () {
      wrapper.setProps({ projectSlug: 'zooniverse/snapshot-wakanda' })
      wrapper.instance().shouldResourceBeLinkable('1234', '^S')
      expect(shouldResourceBeLinkableSpy).to.have.returned(true)
      wrapper.setProps({ projectSlug: '' })
    })

    it('should return true if the symbol is ^S and props.projectSlug is falsey', function () {
      wrapper.instance().shouldResourceBeLinkable('1234', '^S')
      expect(shouldResourceBeLinkableSpy).to.have.returned(false)
    })

    it('should return true if the symbol is @ and the resource is not in the props.restrictedUserNames array', function () {
      wrapper.instance().shouldResourceBeLinkable('srallen', '@')
      expect(shouldResourceBeLinkableSpy).to.have.returned(true)
    })

    it('should return false if the symbol is @ and the resource is in the props.restrictedUserNames array', function () {
      wrapper.instance().shouldResourceBeLinkable('team', '@')
      expect(shouldResourceBeLinkableSpy).to.have.returned(false)
    })
  })

  describe('#renderMedia', function () {
    const videoPropsMock = { src: 'https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4', alt: 'Video of the Zooniverse', children: undefined }
    const audioPropsMock = { src: 'https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga', alt: 'Street noise', children: undefined }
    let renderMediaSpy
    before(function () {
      renderMediaSpy = sinon.spy(Markdownz.prototype, 'renderMedia')
    })
    afterEach(function () {
      renderMediaSpy.resetHistory()
    })
    after(function () {
      renderMediaSpy.restore()
    })

    describe('when the media is an image', function () {
      const imagePropsMock = { src: 'https://via.placeholder.com/350x350', alt: 'image-alt-text', children: undefined }
      const imagePropsMockWithSize = { src: 'https://via.placeholder.com/350x350', alt: 'image-alt-text =100x100', children: undefined }
      it('should return a Grommet Image component', function () {
        wrapper.instance().renderMedia(imagePropsMock)
        const returnedValue = renderMediaSpy.returnValues[0]
        expect(returnedValue.type).to.equal(Image)
      })

      it('should set the alt attribute with the alt prop', function () {
        wrapper.instance().renderMedia(imagePropsMock)
        const returnedValue = renderMediaSpy.returnValues[0]
        expect(returnedValue.props.alt).to.equal(imagePropsMock.alt)
      })

      it('should set the src attribute with the src prop', function () {
        wrapper.instance().renderMedia(imagePropsMock)
        const returnedValue = renderMediaSpy.returnValues[0]
        expect(returnedValue.props.src).to.equal(imagePropsMock.src)
      })

      it('should use the width and height from the alt text if defined', function () {
        wrapper.instance().renderMedia(imagePropsMockWithSize)
        const returnedValue = renderMediaSpy.returnValues[0]
        expect(returnedValue.props.width).to.equal('100')
        expect(returnedValue.props.height).to.equal('100')
      })

      it('should remove the width and height declaration from the alt text before setting it on the rendered Image', function () {
        wrapper.instance().renderMedia(imagePropsMockWithSize)
        const returnedValue = renderMediaSpy.returnValues[0]
        expect(returnedValue.props.alt).to.equal('image-alt-text')
      })
    })
  })
})
