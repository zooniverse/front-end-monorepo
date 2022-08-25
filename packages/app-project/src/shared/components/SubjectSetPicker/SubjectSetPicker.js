import { PlainButton } from '@zooniverse/react-components'
import { Anchor, Box, Grid, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import { array, bool, number, shape, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import addQueryParams from '@helpers/addQueryParams'
import SubjectSetCard from './components/SubjectSetCard'

/*
  Grommet is opinionated about line-height and links it to font-size.
  Reset the heading baselines here so that spacing is measured from
  the tops and bottoms of the letters (without changing the text size.)
  https://matthiasott.com/notes/the-thing-with-leading-in-css
*/
const StyledHeading = styled(Heading)`
  line-height: 100%;
`

/**
  Display a list of subject set cards for a workflow. Each card links to the corresponding subject set ID.
*/
function SubjectSetPicker ({
  baseUrl,
  workflow
}) {
  const { t } = useTranslation('components')
  /*
    Vertical spacing for the picker instructions.
    The theme's named margins are set in multiples of 10px, so set 15px explicitly.
  */
  const textMargin = {
    top: '15px',
    bottom: 'medium'
  }

  const columns = Math.floor(window.innerWidth / 240)

  const sortedSubjectSets = (workflow?.subjectSets)
    ? [...workflow?.subjectSets]
    : []

  // Sort the Subject Sets so completed sets appear at the end.
  sortedSubjectSets.sort((a, b) => {
    const aCompleteness = a.completeness[workflow.id] || 0
    const bCompleteness = b.completeness[workflow.id] || 0
    const aIsComplete = aCompleteness >= 1
    const bIsComplete = bCompleteness >= 1
    return (aIsComplete === bIsComplete)
      ? 0  // We don't change the order if both sets are complete, or both sets are incomplete.
      : aCompleteness - bCompleteness
  })

  return (
    <>
      <Link
        href={addQueryParams(baseUrl)}
        passHref
      >
        <PlainButton
          text={t('SubjectSetPicker.back')}
        />
      </Link>
      <StyledHeading
        level={3}
        margin={{ top: 'xsmall', bottom: 'none' }}
      >
        {t('SubjectSetPicker.heading')}
      </StyledHeading>
      <Paragraph
        margin={textMargin}
      >
        {t('SubjectSetPicker.byline')}
      </Paragraph>
      <Box
        background='light-1'
        border={{ color: 'light-5', size: 'xsmall' }}
        overflow="scroll"
      >
        <Grid
          alignContent='stretch'
          columns={[`repeat(${columns}, minmax(200px, 1fr))`]}
          gap='small'
          pad='medium'
        >
          {sortedSubjectSets.map(subjectSet => {
            const href = `${baseUrl}/workflow/${workflow.id}/subject-set/${subjectSet.id}`
            const panoptesCompleteness = subjectSet.completeness[workflow.id]
            return (
              <Link
                key={subjectSet.id}
                href={addQueryParams(href)}
                passHref
              >
                <Anchor>
                  <SubjectSetCard
                    {...subjectSet}
                    completeness={panoptesCompleteness}  /* This will override subjectSet.completeness */
                  />
                </Anchor>
              </Link>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

SubjectSetPicker.propTypes = {
  /**
    Base URL for links eg. `/${owner}/${project}/classify`
  */
  baseUrl: string.isRequired,
  /**
    The selected workflow.
  */
  workflow: shape({
    completeness: number,
    default: bool,
    display_name: string,
    id: string,
    subjectSets: array
  }).isRequired
}

export default SubjectSetPicker
export { StyledHeading }
