import { render } from '@testing-library/react'
import React from 'react'
import i18n from '@test/i18n/i18n-for-tests'
import sinon from 'sinon'

import {
  Default,
  WithVisiblePriorityMetadata,
  WithVisiblePriorityMetadataAndRetired,
  WithVisiblePriorityMetadataAndAlreadySeen,
  WithRetiredSubject,
  WithAlreadySeenSubject
} from './SubjectSetProgressBanner.stories'

describe('Component > SubjectSetProgressBanner', function () {
  let useTranslationStub

  beforeEach(function () {
    useTranslationStub = sinon.stub(i18n, 't')
  })

  afterEach(function () {
    useTranslationStub.restore()
  })

  describe('with #priority metadata', function () {
    it('should render without crashing', function () {
      const component = render(<Default />)
      expect(component).to.be.ok()
    })

    it('should indicate your position within the subject set', function () {
      const component = render(<Default />)
      expect(useTranslationStub.args[0][1]).to.include.all.keys('number', 'total')
    })

    describe('when the subject is already seen', function () {
      it('should show the Already Seen banner', function () {
        const component = render(<WithAlreadySeenSubject {...WithAlreadySeenSubject.args} />)
        expect(useTranslationStub).to.have.been.calledWith('Banners.SubjectSetProgressBanner.alreadySeen')
      })
    })

    describe('when the subject is retired', function () {
      it('should show the Finished banner', function () {
        const component = render(<WithRetiredSubject {...WithRetiredSubject.args} />)
        expect(useTranslationStub).to.have.been.calledWith('Banners.SubjectSetProgressBanner.finished')
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
      expect(useTranslationStub.args[0][1]).to.include.all.keys('number', 'total')
    })

    describe('when the subject is already seen', function () {
      it('should show the Already Seen banner', function () {
        const component = render(
          <WithVisiblePriorityMetadataAndAlreadySeen
            {...WithVisiblePriorityMetadataAndAlreadySeen.args}
          />
        )
        expect(useTranslationStub).to.have.been.calledWith('Banners.SubjectSetProgressBanner.alreadySeen')
      })
    })

    describe('when the subject is retired', function () {
      it('should show the Finished banner', function () {
        const component = render(
          <WithVisiblePriorityMetadataAndRetired
            {...WithVisiblePriorityMetadataAndRetired.args}
          />
        )
        expect(useTranslationStub).to.have.been.calledWith('Banners.SubjectSetProgressBanner.finished')
      })
    })
  })
})
