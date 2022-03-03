import { shallow } from 'enzyme'
import { Paragraph } from 'grommet'
import Link from 'next/link'

import SubjectSetPicker, { StyledHeading } from './SubjectSetPicker'
import SubjectSetCard from './components/SubjectSetCard'
import { mockWorkflow } from './helpers'

describe('Component > SubjectSetPicker', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <SubjectSetPicker
        baseUrl='/projects/test-owner/test-project/classify'
        title={mockWorkflow.displayName}
        workflow={mockWorkflow}
      />
    )
  })

  describe('content heading', function () {
    let heading

    before(function () {
      heading = wrapper.find(StyledHeading)
    })

    it('should contain the heading text', function () {
      expect(heading.children().first().text()).to.equal('SubjectSetPicker.heading')
      /** The translation function will simply return keys in a testing env */
    })

    it('should have an xsmall top margin', function () {
      expect(heading.props().margin.top).to.equal('xsmall')
    })

    it('should have no bottom margin', function () {
      expect(heading.props().margin.bottom).to.equal('none')
    })
  })

  describe('content byline', function () {
    let description

    before(function () {
      description = wrapper.find(Paragraph)
    })

    it('should contain the byline text', function () {
      expect(description.children().first().text()).to.equal('SubjectSetPicker.byline')
      /** The translation function will simply return keys in a testing env */
    })

    it('should have a small top margin', function () {
      expect(description.props().margin.top).to.equal('15px')
    })

    it('should have a larger bottom margin', function () {
      expect(description.props().margin.bottom).to.equal('medium')
    })
  })

  describe('subject set cards', function () {

    it('should render the correct amount', function () {
      const cards = wrapper.find(SubjectSetCard)
      expect(cards.length).to.equal(mockWorkflow.subjectSets.length)
    })

    it('should render completed Subject Sets after incomplete Subject Sets', function () {
      const cards = wrapper.find(SubjectSetCard)

      // Assuming un-sorted array is: [
      //   { 'Ultraman Series', completeness: 1 },
      //   { 'Transformers Series', completeness: 0 },
      //   { 'Overwatch Series', completeness: 0.67 },
      // ]
      expect(cards.at(0).props().display_name).to.equal('Transformers Series')
      expect(cards.at(0).props().completeness).to.equal(0)

      expect(cards.at(1).props().display_name).to.equal('Overwatch Series')
      expect(cards.at(1).props().completeness).to.equal(0.67)

      expect(cards.at(2).props().display_name).to.equal('Ultraman Series')
      expect(cards.at(2).props().completeness).to.equal(1)
    })
  })

  describe('Back link', function () {
    let link

    before(function () {
      link = wrapper.find(Link).first()
    })

    it('should link to the base URL', function () {
      expect(link.prop('href')).to.equal('/projects/test-owner/test-project/classify')
    })
  })
})
