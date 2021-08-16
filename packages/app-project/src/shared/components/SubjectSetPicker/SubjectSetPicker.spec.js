import { SpacedText } from '@zooniverse/react-components'
import { shallow } from 'enzyme'
import { Button, Paragraph } from 'grommet'
import Link from 'next/link'
import sinon from 'sinon'

import SubjectSetPicker, { BackButton, StyledHeading } from './SubjectSetPicker'
import SubjectSetCard from './components/SubjectSetCard'
import en from './locales/en'
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
      expect(heading.children().first().text()).to.equal(en.SubjectSetPicker.heading)
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
      expect(description.children().first().text()).to.equal(en.SubjectSetPicker.byline)
    })

    it('should have a small top margin', function () {
      expect(description.props().margin.top).to.equal('15px')
    })

    it('should have a larger bottom margin', function () {
      expect(description.props().margin.bottom).to.equal('medium')
    })
  })

  it('should render subject set cards', function () {
    const cards = wrapper.find(SubjectSetCard)
    expect(cards.length).to.equal(mockWorkflow.subjectSets.length)
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