import { render } from '@testing-library/react'
import React from 'react'

import {
  Default,
  WithVisiblePriorityMetadata,
  WithVisiblePriorityMetadataAndRetired,
  WithVisiblePriorityMetadataAndAlreadySeen,
  WithRetiredSubject,
  WithAlreadySeenSubject
} from './SubjectSetProgressBanner.stories'

describe('Component > SubjectSetProgressBanner', function () {
  describe('with #priority metadata', function () {
    it('should render without crashing', function () {
      const component = render(<Default />)
      expect(component).to.be.ok()
    })

    it('should indicate your position within the subject set', function () {
      const component = render(<Default />)
      const bannerText = 'Hello there!: Subject 37/56'
      expect(component.getByText(bannerText)).to.exist()
    })

    describe('when the subject is already seen', function () {
      it('should show the Already Seen banner', function () {
        const component = render(<WithAlreadySeenSubject {...WithAlreadySeenSubject.args} />)
        const bannerText = 'Hello there!: Subject 37/56 (Already seen)'
        expect(component.getByText(bannerText)).to.exist()
      })
    })

    describe('when the subject is retired', function () {
      it('should show the Finished banner', function () {
        const component = render(<WithRetiredSubject {...WithRetiredSubject.args} />)
        const bannerText = 'Hello there!: Subject 37/56 (Finished)'
        expect(component.getByText(bannerText)).to.exist()
      })
    })
  })

  describe('with priority metadata', function () {
    it('should render without crashing', function () {
      const component = render(<WithVisiblePriorityMetadata />)
      expect(component).to.be.ok()
    })

    it('should indicate your position within the subject set', function () {
      const component = render(<WithVisiblePriorityMetadata />)
      const bannerText = 'Hello there!: Subject 37/56'
      expect(component.getByText(bannerText)).to.exist()
    })

    describe('when the subject is already seen', function () {
      it('should show the Already Seen banner', function () {
        const component = render(
          <WithVisiblePriorityMetadataAndAlreadySeen
            {...WithVisiblePriorityMetadataAndAlreadySeen.args}
          />
        )
        const bannerText = 'Hello there!: Subject 37/56 (Already seen)'
        expect(component.getByText(bannerText)).to.exist()
      })
    })

    describe('when the subject is retired', function () {
      it('should show the Finished banner', function () {
        const component = render(
          <WithVisiblePriorityMetadataAndRetired
            {...WithVisiblePriorityMetadataAndRetired.args}
          />
        )
        const bannerText = 'Hello there!: Subject 37/56 (Finished)'
        expect(component.getByText(bannerText)).to.exist()
      })
    })
  })
})
