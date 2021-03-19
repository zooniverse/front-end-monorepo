import { panoptes } from '@zooniverse/panoptes-js'
import { Media, SpacedText } from '@zooniverse/react-components'
import { Box, Paragraph, Text } from 'grommet'
import getConfig from 'next/config'
import { array, number, string } from 'prop-types'
import React from 'react'

function SubjectSetCard (props) {
  const { availableSubjects, display_name, id, set_member_subjects_count, subjects } = props
  const [subject] = subjects
  const { publicRuntimeConfig = {} } = getConfig() || {}
  const assetPrefix = publicRuntimeConfig.assetPrefix || ''
  const placeholderUrl = `${assetPrefix}/subject-placeholder.png`
  const subjectURLs = subject ? subject.locations.map(location => Object.values(location)[0]) : []
  const alt = subject ? `Subject ${subject.id}` : 'Loading'
  const completeness = 1 - (availableSubjects / set_member_subjects_count)
  const percentComplete = parseInt(100 * completeness)

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
        <SpacedText
          truncate
          weight="bold"
        >
          {display_name}
        </SpacedText>
        <Paragraph
          margin={{
            top: 'small',
            bottom: 'none',
            horizontal: 'none'
          }}
        >
          <Text
            weight="normal"
          >
            {`${set_member_subjects_count} subjects`}
          </Text>
            <br/>
          <Text
            weight="normal"
          >
            {`${percentComplete}% complete`}
          </Text>
        </Paragraph>
      </Box>
    </Box>
  )
}

SubjectSetCard.propTypes = {
  display_name: string.required,
  id: string.required,
  set_member_subjects_count: number.required,
  subjects: array
}

SubjectSetCard.defaultProps = {
  subjects: []
}

export default SubjectSetCard