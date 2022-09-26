import React from 'react'
import { render, screen } from '@testing-library/react'

import Media from '../Media'
import {
  Markdownz,
  RESTRICTED_USERNAMES,
  buildResourceURL,
  renderMedia,
  replaceImageString,
  shouldResourceBeLinkable
} from './Markdownz'
import { markdown } from './helpers/testExamples'

// TO DO: Add back working snapshots to test the overall HTML output
// We have to use snapshots with styled-components because of the generated class names
describe('<Markdownz />', function () {
  it('parses markdown to jsx', function () {
    const { container } = render(<Markdownz>{markdown}</Markdownz>)
    expect(container.querySelectorAll('a[href]')).to.have.lengthOf(12)
    expect(container.querySelectorAll('p')).to.have.lengthOf(17)
  })

  describe('at-mentions', function () {
    ['srallen', 'am.zooni', 'a-user'].forEach(function (username) {
      describe(username, function () {
        function findMention(sentence) {
          render(<Markdownz>{sentence}</Markdownz>)
          const pingAnchor = screen.getByRole('link', { name: `@ ${username}` })
          expect(pingAnchor.href).to.equal(`https://localhost/users/${username}`)
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
    render(<Markdownz projectSlug='zooniverse/snapshot-wakanda'>{sentence}</Markdownz>)
    const pingAnchor = screen.getByRole('link', { name: '^S 1234' })
    expect(pingAnchor.href).to.equal('https://localhost/projects/zooniverse/snapshot-wakanda/talk/subjects/1234')
  })

  describe('#buildResourceURL', function () {

    it('should return an empty string if symbol is not defined', function () {
      const url = buildResourceURL()
      expect(url).to.equal('')
    })

    it('should return an empty string if the resource is falsy, but the mention symbol is present', function () {
      const url = buildResourceURL('', '', '', '@')
      expect(url).to.equal('')
    })

    describe('when the symbol is #', function () {
      it('should return the expected url with a search query param', function () {
        const resource = 'tigers'
        const baseURL = ''
        const url = buildResourceURL(baseURL, '', resource, '#')
        expect(url).to.equal(`${baseURL}/talk/search?query=%23${resource}`)
      })

      it('should return a url with the project slug if props.projectSlug is defined', function () {
        const resource = 'tigers'
        const projectSlug = 'zooniverse/snapshot-wakanda'
        const url = buildResourceURL('', projectSlug, resource, '#')
        expect(url).to.equal(`/projects/${projectSlug}/talk/tag/${resource}`)
      })

      it('should return a url with props.baseURI if defined', function () {
        const resource = 'tigers'
        const baseURI = 'https://classrooms.zooniverse.org'
        const url = buildResourceURL(baseURI, '', resource, '#')
        expect(url).to.equal(`${baseURI}/talk/search?query=%23${resource}`)
      })
    })

    describe('when the symbol is @', function () {
      it('should return a url for the user profile', function () {
        const resource = 'srallen'
        const url = buildResourceURL('', '', resource, '@')
        expect(url).to.equal(`/users/${resource}`)
      })

      it('should return a url with the project slug if props.projectSlug is defined', function () {
        const resource = 'srallen'
        const projectSlug = 'zooniverse/snapshot-wakanda'
        const url = buildResourceURL('', projectSlug, resource, '@')
        expect(url).to.equal(`/projects/${projectSlug}/users/${resource}`)
      })

      it('should return a url with props.baseURI if defined', function () {
        const resource = 'srallen'
        const baseURI = 'https://classrooms.zooniverse.org'
        const url = buildResourceURL(baseURI, '', resource, '@')
        expect(url).to.equal(`${baseURI}/users/${resource}`)
      })
    })

    describe('when the symbol is ^S', function () {
      it('should return an empty string if props.projectSlug is not defined', function () {
        const resource = '1245'
        const url = buildResourceURL('', '', resource, '^S')
        expect(url).to.equal('')
      })

      it('should return a url with the project slug if props.projectSlug is defined', function () {
        const resource = '1234'
        const projectSlug = 'zooniverse/snapshot-wakanda'
        const url = buildResourceURL('', projectSlug, resource, '^S')
        expect(url).to.equal(`/projects/${projectSlug}/talk/subjects/${resource}`)
      })

      it('should return a url with props.baseURI if defined', function () {
        const resource = '1234'
        const baseURI = 'https://classrooms.zooniverse.org'
        const projectSlug = 'zooniverse/snapshot-wakanda'
        const url = buildResourceURL(baseURI, projectSlug, resource, '^S')
        expect(url).to.equal(`${baseURI}/projects/${projectSlug}/talk/subjects/${resource}`)
      })
    })
  })

  describe('#shouldResourceBeLinkable', function () {
    it('should default to return true', function () {
      expect(shouldResourceBeLinkable([], '', 'tigers', '#')).to.be.true()
    })

    it('should return true if the symbol is ^S and props.projectSlug is truthy', function () {
      expect(shouldResourceBeLinkable([], 'zooniverse/snapshot-wakanda', '1234', '^S')).to.be.true()
    })

    it('should return true if the symbol is ^S and props.projectSlug is falsey', function () {
      expect(shouldResourceBeLinkable([], '', '1234', '^S')).to.be.false()
    })

    it('should return true if the symbol is @ and the resource is not in the props.restrictedUserNames array', function () {
      expect(shouldResourceBeLinkable([], '', 'srallen', '@')).to.be.true()
    })

    it('should return false if the symbol is @ and the resource is in the props.restrictedUserNames array', function () {
      RESTRICTED_USERNAMES.forEach((username) => {
        expect(shouldResourceBeLinkable(RESTRICTED_USERNAMES, '', username, '@')).to.be.false()
      })
    })
  })

  describe('#replaceImageString', function () {
    it('should return a string', function () {
      expect(replaceImageString(markdown)).to.be.a('string')
    })

    it('should remove any size parameters from markdown image src, and place them in the alt tag', function () {
      const img = '![imagealttext](https://panoptes-uploads.zooniverse.org/production/subject_location/66094.jpeg =100x100)'
      const altText = 'imagealttext'
      const imageSize = '=100x100'
      const imageURL = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094.jpeg'
      const expectedReturnValue = '![imagealttext =100x100](https://panoptes-uploads.zooniverse.org/production/subject_location/66094.jpeg)'
      expect(replaceImageString(img, altText, imageURL, imageSize)).to.equal(expectedReturnValue)
    })
  })

  describe('#renderMedia', function () {
    const src = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
    const altText = 'A placeholder image.'
    const imagePropsMock = { src, alt: altText, children: undefined }
    const imagePropsMockWithSize = { src, alt: `${altText} =100x100`, children: undefined }

    it('should return a Media component', function () {
      const returnedValue = renderMedia(imagePropsMock)
      expect(returnedValue.type).to.equal(Media)
    })

    it('should set the alt attribute with the alt prop', function () {
      const returnedValue = renderMedia(imagePropsMock)
      expect(returnedValue.props.alt).to.equal(imagePropsMock.alt)
    })

    it('should set the src attribute with the src prop', function () {
      const returnedValue = renderMedia(imagePropsMock)
      expect(returnedValue.props.src).to.equal(imagePropsMock.src)
    })

    it('should use the width and height from the alt text if defined', function () {
      const returnedValue = renderMedia(imagePropsMockWithSize)
      expect(returnedValue.props.width).to.equal(100)
      expect(returnedValue.props.height).to.equal(100)
    })

    it('should set max height as none if only width is defined', function () {
      const imagePropsMockWithWidth = { src, alt: `${altText} =100x`, children: undefined }
      const returnedValue = renderMedia(imagePropsMockWithWidth)
      expect(returnedValue.props.width).to.equal(100)
      expect(returnedValue.props.height).to.equal('none')
    })

    it('should remove the width and height declaration from the alt text before setting it on the rendered Image', function () {
      const returnedValue = renderMedia(imagePropsMockWithSize)
      expect(returnedValue.props.alt).to.equal(altText)
    })
  })
})
