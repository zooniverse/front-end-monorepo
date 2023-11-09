import { render, screen } from '@testing-library/react'

import Media from '../Media'
import {
  Markdownz,
  renderMedia
} from './Markdownz'
import { markdown } from './helpers/testExamples'

// TO DO: Add back working snapshots to test the overall HTML output
// We have to use snapshots with styled-components because of the generated class names
describe('<Markdownz />', function () {
  it('parses markdown to jsx', function () {
    const { container } = render(<Markdownz projectSlug='zooniverse/snapshot-wakanda'>{markdown}</Markdownz>)
    expect(container.querySelectorAll('a[href]')).to.have.lengthOf(11)
    expect(container.querySelectorAll('p')).to.have.lengthOf(19)
  })

  describe('at-mentions', function () {
    ['srallen', 'am.zooni', 'a-user'].forEach(function (username) {
      describe(username, function () {
        function findMention(sentence) {
          render(<Markdownz>{sentence}</Markdownz>)
          const pingAnchor = screen.getByRole('link', { name: `@${username}` })
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
    const pingAnchor = screen.getByRole('link', { name: 'Subject 1234' })
    expect(pingAnchor.href).to.equal('https://localhost/projects/zooniverse/snapshot-wakanda/talk/subjects/1234')
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

    it('height should be undefined if only width is defined', function () {
      const imagePropsMockWithWidth = { src, alt: `${altText} =100x`, children: undefined }
      const returnedValue = renderMedia(imagePropsMockWithWidth)
      expect(returnedValue.props.width).to.equal(100)
      expect(returnedValue.props.height).to.equal(undefined)
    })

    it('should remove the width and height declaration from the alt text before setting it on the rendered Image', function () {
      const returnedValue = renderMedia(imagePropsMockWithSize)
      expect(returnedValue.props.alt).to.equal(altText)
    })
  })
})
