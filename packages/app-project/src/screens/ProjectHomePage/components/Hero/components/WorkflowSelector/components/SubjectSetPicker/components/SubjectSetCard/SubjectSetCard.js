import { panoptes } from '@zooniverse/panoptes-js'
import { Media, SpacedText } from '@zooniverse/react-components'
import { Box, Paragraph } from 'grommet'
import getConfig from 'next/config'
import { number, string } from 'prop-types'
import React, { useState } from 'react'

async function previewImage (subjectSetID) {
  const subject = await panoptes
    .get('/set_member_subjects', {
      subject_set_id: subjectSetID,
      include: 'subject',
      page_size: 1
    })
    .then(response => {
      const { linked } = response.body
      const [subject] = linked.subjects
      return subject
    })
  return subject
}

function SubjectSetCard (props) {
  const { display_name, id, set_member_subjects_count } = props
  const [ subject, setSubject ] = useState(null)
  const { publicRuntimeConfig = {} } = getConfig() || {}
  const assetPrefix = publicRuntimeConfig.assetPrefix || ''
  const placeholderUrl = `${assetPrefix}/subject-placeholder.png`
  previewImage(id)
    .then(subject => setSubject(subject))
  const subjectURLs = subject ? subject.locations.map(location => Object.values(location)[0]) : []
  const alt = subject ? `Subject ${subject.id}` : 'Loading'

  return (
    <Box
      background='neutral-6'
      border='all'
    >
      <Box
        align='center'
        height='100px'
        overflow='hidden'
        width='100%'
      >
        <Media
          alt={alt}
          height={700}
          placeholder={<img alt='' role='presentation' src={placeholderUrl} />}
          src={subjectURLs[0]}
          width={700}
        />
      </Box>
      <Box
        pad='small'
      >
        <SpacedText>{display_name}</SpacedText>
        <Paragraph>
          {set_member_subjects_count} subjects
        </Paragraph>
      </Box>
    </Box>
  )
}

SubjectSetCard.propTypes = {
  display_name: string.required,
  set_member_subjects_count: number.required
}
export default SubjectSetCard