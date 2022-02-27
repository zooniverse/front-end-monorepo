import { Media, SpacedText } from '@zooniverse/react-components'
import { Box, Paragraph, Text } from 'grommet'
import getConfig from 'next/config'
import { array, number, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

const PossiblyTransparentBox = styled(Box)`
  ${props => css`opacity: ${(props.isComplete) ? '0.5' : '1.0'};`}
`

/**
  Summary card for a subject set, showing a preview subject, the set name, total subject count and completeness percentage.
*/
function SubjectSetCard ({
  completeness = 0,
  display_name,
  id,
  set_member_subjects_count,
  subjects = []
}) {
  const { t } = useTranslation('components')
  const [subject] = subjects
  const { publicRuntimeConfig = {} } = getConfig() || {}
  const assetPrefix = publicRuntimeConfig.assetPrefix || ''
  const placeholderUrl = `${assetPrefix}/assets/subject-placeholder.png`
  const subjectURLs = subject ? subject.locations.map(location => Object.values(location)[0]) : []
  const alt = subject ? `Subject ${subject.id}` : 'Loading'
  const percentComplete = parseInt(100 * completeness)
  const isComplete = completeness >= 1

  return (
    <Box
      background='neutral-6'
      border='all'
    >
      <PossiblyTransparentBox
        align='center'
        height='100px'
        isComplete={isComplete}
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
      </PossiblyTransparentBox>
      <PossiblyTransparentBox
        isComplete={isComplete}
        pad='small'
      >
        {(isComplete) && (
          <SpacedText
            weight="normal"
          >
            {t('SubjectSetPicker.SubjectSetCard.isComplete')}
          </SpacedText>
        )}

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

          <br />

          {(!isComplete) && (
            <Text
              weight="normal"
            >
              {percentComplete}% complete
            </Text>
          )}
        </Paragraph>
      </PossiblyTransparentBox>
    </Box>
  )
}

SubjectSetCard.propTypes = {
  /**
   The number of subjects available to be classified.
  */
  availableSubjects: number.isRequired,
  /**
   Subject set title.
  */
  display_name: string.isRequired,
  /**
    Subject set ID.
  */
  id: string.isRequired,
  /**
    Total subject count
  */
  set_member_subjects_count: number.isRequired,
  /**
   Preview subjects. Used to show a preview image.
  */
  subjects: array
}

export default SubjectSetCard
