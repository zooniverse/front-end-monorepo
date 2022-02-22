import { render, fireEvent } from '@testing-library/react'
import * as stories from './AboutDropdownNav.stories'
import sinon from 'sinon'
import i18n from '@test/i18n-for-tests'

describe('Component > AboutDropdownNav', function () {
  const { Default, MoreLinks } = stories

  let scrollMock
  let useTranslationStub

  beforeEach(function () {
    // Calling window.scrollTo is a side effect of clicking a Grommet Dropbutton
    scrollMock = sinon.stub(window, 'scrollTo').callsFake(() => {})
    useTranslationStub = sinon.stub(i18n, 't')
  })

  afterEach(function () {
    scrollMock.restore()
    useTranslationStub.restore()
  })

  it('should always render at least two links: Research and The Team', function () {
    const { getByRole, getAllByRole } = render(<Default />)
    fireEvent.click(getByRole('button'))
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(2)
    expect(useTranslationStub).to.have.been.calledWith('About.PageHeading.title.research')
    expect(useTranslationStub).to.have.been.calledWith('About.PageHeading.title.team')
  })

  it('should render other links passed in the aboutNavLinks array', function () {
    const { getByRole, getAllByRole } = render(<MoreLinks />)
    fireEvent.click(getByRole('button'))
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(4)
    expect(useTranslationStub).to.have.been.calledWith('About.PageHeading.title.education')
    expect(useTranslationStub).to.have.been.calledWith('About.PageHeading.title.faq')
  })
})
