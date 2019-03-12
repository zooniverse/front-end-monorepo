import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Media from '../Media'
import Markdownz from './Markdownz'
import { jsx, markdown } from './helpers/testExamples'

// TO DO: Add back working snapshots to test the overall HTML output
// We have to use snapshots with styled-components because of the generated class names
describe('<Markdownz />', function () {
  let wrapper

  it('renders without crashing', function () { 
    wrapper = shallow(<Markdownz>{markdown}</Markdownz>)
    expect(wrapper).to.be.ok
  })

  it('parses markdown to jsx', function () {
    wrapper = shallow(<Markdownz>{markdown}</Markdownz>)
    expect(wrapper.equals(jsx)).to.be.true
  })

  describe('at-mentions', function () {
    ['srallen', 'am.zooni', 'a-user'].forEach(function (username) {
      describe(username, function () {
        function findMention(sentence) {
          wrapper = shallow(<Markdownz>{sentence}</Markdownz>)
          const pingAnchor = wrapper.find({ href: `/users/${username}` })
          expect(pingAnchor).to.have.lengthOf(1)
          expect(pingAnchor.text()).to.equal(`@${username}`)
        }

        it('should be recognised at the beginning of a sentence', function () {
          const sentence = `@${username} is great!`
          findMention(sentence)
        })

        it('should be recognised in the middle of a sentence', function () {
          const sentence = `I would like to ping @${username} if they're online.`
          findMention(sentence)
        })

        it('should be recognised at the end of a sentence', function () {
          const sentence = `I would like to ping @${username}.`
          findMention(sentence)
        })
      })
    })
  })

  it('correctly parses a subject mention in project context', function () {
    const sentence = `Look at this interesting subject: ^S1234.`
    wrapper = shallow(<Markdownz projectSlug='zooniverse/snapshot-wakanda'>{sentence}</Markdownz>)
    const pingAnchor = wrapper.find({ href: "/projects/zooniverse/snapshot-wakanda/talk/subjects/1234" })
    expect(pingAnchor).to.have.lengthOf(1)
    expect(pingAnchor.text()).to.equal('^S1234')
  })

  describe('#buildResourceURL', function () {
    let buildResourceURLSpy
    before(function () {
      wrapper = shallow(<Markdownz>{markdown}</Markdownz>)
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

    it('should return an empty string if the resource is falsy, but the mention symbol is present', function () {
      const url = wrapper.instance().buildResourceURL('', '@')
      expect(url).to.equal('')
    })

    describe('when the symbol is #', function () {
      it('should return the expected url with a search query param', function () {
        const resource = 'tigers'
        const baseURL = ''
        const expectedReturnValue = `${baseURL}/talk/search?query=%23${resource}`
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
        const expectedReturnValue = `${baseURI}/talk/search?query=%23${resource}`
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
      wrapper = shallow(<Markdownz>{markdown}</Markdownz>)
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
    let renderMediaSpy
    const src = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
    const altText = 'A placeholder image.'
    const imagePropsMock = { src, alt: altText, children: undefined }
    const imagePropsMockWithSize = { src, alt: `${altText} =100x100`, children: undefined }
    before(function () {
      wrapper = shallow(<Markdownz>{markdown}</Markdownz>)
      renderMediaSpy = sinon.spy(Markdownz.prototype, 'renderMedia')
    })
    afterEach(function () {
      renderMediaSpy.resetHistory()
    })
    after(function () {
      renderMediaSpy.restore()
    })

    it('should return a Media component', function () {
      wrapper.instance().renderMedia(imagePropsMock)
      const returnedValue = renderMediaSpy.returnValues[0]
      expect(returnedValue.type).to.equal(Media)
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
      expect(returnedValue.props.width).to.equal(100)
      expect(returnedValue.props.height).to.equal(100)
    })

    it('should remove the width and height declaration from the alt text before setting it on the rendered Image', function () {
      wrapper.instance().renderMedia(imagePropsMockWithSize)
      const returnedValue = renderMediaSpy.returnValues[0]
      expect(returnedValue.props.alt).to.equal(altText)
    })
  })
})
