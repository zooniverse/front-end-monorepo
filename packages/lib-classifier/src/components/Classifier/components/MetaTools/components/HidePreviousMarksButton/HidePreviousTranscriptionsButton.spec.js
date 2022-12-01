import { shallow } from 'enzyme'
import sinon from 'sinon'
import i18n from '@test/i18n/i18n-for-tests'

import { HidePreviousTranscriptionsButton, StyledDrop } from './HidePreviousTranscriptionsButton'
import SHOWN_MARKS from '@helpers/shownMarks'


describe('Component > HidePreviousTranscriptionsButton', function () {
  let wrapper, useTranslationStub

  beforeEach(function () {
    useTranslationStub = sinon.stub(i18n, 't').callsFake((key) => key)
  })

  afterEach(function () {
    useTranslationStub.restore()
  })

  it('should render without crashing', function () {
    wrapper = shallow(<HidePreviousTranscriptionsButton />)
    expect(wrapper).to.be.ok()
  })

  it('should show the correct aria title', function () {
    wrapper = shallow(
      <HidePreviousTranscriptionsButton
        shownMarks={SHOWN_MARKS.ALL}
      />)
    const drop = wrapper.find(StyledDrop).first()
    const { a11yTitle } = drop.props()
    expect(a11yTitle).exists()
    expect(useTranslationStub).to.have.been.calledWith('MetaTools.HidePreviousTranscriptionsButton.show')
  })

  describe('and showing user marks', function () {
    it('should show the correct aria title', function () {
      wrapper = shallow(
        <HidePreviousTranscriptionsButton
          shownMarks={SHOWN_MARKS.USER}
        />)
      const drop = wrapper.find(StyledDrop).first()
      const { a11yTitle } = drop.props()
      expect(a11yTitle).exists()
      expect(useTranslationStub).to.have.been.calledWith('MetaTools.HidePreviousTranscriptionsButton.showUser')
    })
  })

  describe('and showing no marks', function () {
    it('should show the correct aria title', function () {
      wrapper = shallow(
        <HidePreviousTranscriptionsButton
          shownMarks={SHOWN_MARKS.NONE}
        />)
      const drop = wrapper.find(StyledDrop).first()
      const { a11yTitle } = drop.props()
      expect(a11yTitle).exists()
      expect(useTranslationStub).to.have.been.calledWith('MetaTools.HidePreviousTranscriptionsButton.hide')
    })
  })

  describe('isOpen state', function () {
    before(function () {
      wrapper = shallow(<HidePreviousTranscriptionsButton />)
    })

    it('should default to false', function () {
      const drop = wrapper.find(StyledDrop).first()
      const { open } = drop.props()
      expect(open).to.be.false()
    })

    describe('when clicking the button to open and close', function () {
      it('should toggle isOpen state', function () {
        const firstInstance = wrapper.find(StyledDrop).first()
        firstInstance.props().onOpen()
        const secondInstance = wrapper.find(StyledDrop).first()
        expect(secondInstance.props().open).to.be.true()
        secondInstance.props().onClose()
        const thirdInstance = wrapper.find(StyledDrop).first()
        expect(thirdInstance.props().open).to.be.false()
      })
    })
  })
})
