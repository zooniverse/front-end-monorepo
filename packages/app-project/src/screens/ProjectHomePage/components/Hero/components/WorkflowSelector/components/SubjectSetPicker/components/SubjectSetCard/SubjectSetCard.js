import { SpacedText } from '@zooniverse/react-components'
import { number, string } from 'prop-types'
import React from 'react'

function SubjectSetCard (props) {
  const { display_name, set_member_subjects_count } = props
  return (
    <p>
      <SpacedText>{display_name}</SpacedText><br/>
      <SpacedText>Subjects: {set_member_subjects_count}</SpacedText>
    </p>
  )
}

SubjectSetCard.propTypes = {
  display_name: string.required,
  set_member_subjects_count: number.required
}
export default SubjectSetCard