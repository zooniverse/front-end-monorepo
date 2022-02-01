import * as stories from './AboutSidebar.stories'
import { render } from '@testing-library/react'
import sinon from 'sinon'
import i18n from '@test/i18n-for-tests'

describe('Component > AboutSidebar', function () {
  const { Default, MoreLinks } = stories

  let useTranslationStub

  before(function () {
    useTranslationStub = sinon.stub(i18n, 't')
  })

  after(function () {
    useTranslationStub.restore()
  })

  it('should always render at least two links: Research and The Team', function () {
    const { getAllByRole } = render(<Default />)
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(2)
    expect(useTranslationStub).to.have.been.calledWith('About.PageHeading.title.research')
    expect(useTranslationStub).to.have.been.calledWith('About.PageHeading.title.team')
  })

  it('should render other links passed in the aboutNavLinks array', function () {
    const { getAllByRole } = render(<MoreLinks />)
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(4)
    expect(useTranslationStub).to.have.been.calledWith('About.PageHeading.title.education')
    expect(useTranslationStub).to.have.been.calledWith('About.PageHeading.title.faq')
  })
})
