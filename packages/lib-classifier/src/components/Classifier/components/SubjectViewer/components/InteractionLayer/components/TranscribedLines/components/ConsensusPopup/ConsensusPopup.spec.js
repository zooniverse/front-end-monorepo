import React from 'react'
import { List, Paragraph, Text } from 'grommet'
import { shallow } from 'enzyme'
import { MovableModal } from '@zooniverse/react-components'
import ConsensusPopup from './ConsensusPopup'
import setupMock from './helpers/setupMock'
import en from './locales/en'

describe('TranscribedLines > Component > ConsensusPopup', function () {
  const completedLines = setupMock()
  it('should render without crashing', function () {
    const wrapper = shallow(<ConsensusPopup />)
    expect(wrapper).to.be.ok()
  })

  it('should render empty if not active', function () {
    const wrapper = shallow(<ConsensusPopup />)
    expect(wrapper.html()).to.be.empty()
  })

  describe('when active', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<ConsensusPopup active line={completedLines[0] }/>)
    })

    it('should render a MovableModal component', function () {
      expect(wrapper.find(MovableModal)).to.have.lengthOf(1)
    })

    describe('title bar', function () {
      let modal
      before(function () {
        modal = wrapper.find(MovableModal)
      })

      it('should have a themed background', function () {
        expect(modal.prop('headingBackground')).to.deep.equal({
          dark: 'dark-5',
          light: 'neutral-6'
        })
      })

      it('should use the default text colour', function () {
        expect(modal.prop('titleColor')).to.equal('')
      })
    })

    it('should render an explanatory text with the number of textOptions from the line data', function () {
      const firstParagraph = wrapper.find(Paragraph).first()
      expect(firstParagraph.contains(`These ${completedLines[0].textOptions.length} transcriptions have been submitted by previous volunteers and cannot be modified.`)).to.be.true()
    })

    it('should render the consensus text with explanation', function () {
      const consensusText = wrapper.find(Paragraph).at(1)
      expect(consensusText.contains(completedLines[0].consensusText)).to.be.true()
      expect(consensusText.find(Text)).to.have.lengthOf(1)
      expect(consensusText.find(Text).contains(en.ConsensusPopup.aggregatedTranscription)).to.be.true()
    })

    it('should a List of transcriptions that contributed to the consensus text', function () {
      const list = wrapper.find(List)
      expect(list).to.have.lengthOf(1)
      expect(list.props().data).to.deep.equal(completedLines[0].textOptions)
    })

    describe('when there there is missing line data', function () {
      let wrapper
      before(function () {
        wrapper = shallow(<ConsensusPopup active />)
      })

      it('should render an explanation when there is no consensus text', function () {
        const explanation = wrapper.find(Paragraph).at(1)
        expect(explanation.contains(en.ConsensusPopup.noAggregation)).to.be.true()
        expect(wrapper.find(Text)).to.have.lengthOf(0)
      })

      it('should render an explanation when there are no contributing transcriptions', function () {
        expect(wrapper.find(Paragraph).at(2).contains(en.ConsensusPopup.transcriptionsUnavailable)).to.be.true()
        expect(wrapper.find(List)).to.have.lengthOf(0)
      })
    })
  })
})