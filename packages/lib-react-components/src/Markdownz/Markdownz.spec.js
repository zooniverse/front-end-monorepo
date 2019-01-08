import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Markdownz from './Markdownz'

const content = '# Zooniverse'

describe.only('<Markdownz />', function () {
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

  xdescribe('#shouldResourceBePingable')

  xdescribe('#renderMedia')
})
