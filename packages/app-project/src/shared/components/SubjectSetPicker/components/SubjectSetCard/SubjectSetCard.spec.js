import { Media, SpacedText } from '@zooniverse/react-components'
import { shallow } from 'enzyme'
import { Paragraph, Text } from 'grommet'
import React from 'react'

import SubjectSetCard from './'
import { mockWorkflow } from '../../helpers'

describe('Component > SubjectSetCard', function () {
  let wrapper
  const [subjectSet] = mockWorkflow.subjectSets

  before(function () {
    wrapper = shallow(
      <SubjectSetCard
        {...subjectSet}
      />
    )
  })

  it('should have a preview image', function () {
    const image = wrapper.find(Media)
    const [subject] = subjectSet.subjects
    const [location] = subject.locations
    const previewSrc = Object.values(location)[0]
    expect(image.props().src).to.equal(previewSrc)
  })

  it('should render the display name as spaced text', function () {
    const displayName = wrapper.find(SpacedText).children().first()
    expect(displayName.text()).to.equal(subjectSet.display_name)
  })

  it('shouldshow the number of subjects in the set', function () {
    const para = wrapper.find(Paragraph)
    const subjectsCount = para.find(Text).children().first()
    expect(subjectsCount.text()).to.equal(`${subjectSet.set_member_subjects_count} subjects`)
  })
})