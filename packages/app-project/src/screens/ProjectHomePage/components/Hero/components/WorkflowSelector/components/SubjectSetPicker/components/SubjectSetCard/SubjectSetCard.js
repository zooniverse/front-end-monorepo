import { Media, SpacedText } from '@zooniverse/react-components'
import { Box, Paragraph } from 'grommet'
import getConfig from 'next/config'
import { number, string } from 'prop-types'
import React from 'react'

function SubjectSetCard (props) {
  const { display_name, set_member_subjects_count } = props
  const { publicRuntimeConfig = {} } = getConfig() || {}
  const assetPrefix = publicRuntimeConfig.assetPrefix || ''
  const placeholderUrl = `${assetPrefix}/subject-placeholder.png`
  const subjectURL = placeholderUrl

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
          alt={`placeholder subject`}
          height={700}
          placeholder={<img alt='' role='presentation' src={placeholderUrl} />}
          src={subjectURL}
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