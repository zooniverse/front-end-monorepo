import { PlainButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Grid, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { array, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import addQueryParams from '@helpers/addQueryParams'

import SubjectSetCard from './components/SubjectSetCard'
import en from './locales/en'

counterpart.registerTranslations('en', en)

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
  const router = useRouter()
  /*
    Vertical spacing for the picker instructions.
    The theme's named margins are set in multiples of 10px, so set 15px explicitly.
  */
  const textMargin = {
    top: '15px',
    bottom: 'medium'
  }

  const columns = Math.floor(window.innerWidth / 240)

  return (
    <>
      <Link
        href={addQueryParams(baseUrl, router)}
        passHref
      >
        <PlainButton
          text={counterpart('SubjectSetPicker.back')}
        />
      </Link>
      <StyledHeading
        level={3}
        margin={{ top: 'xsmall', bottom: 'none' }}
      >
        {counterpart('SubjectSetPicker.heading')}
      </StyledHeading>
      <Paragraph
        margin={textMargin}
      >
        {counterpart('SubjectSetPicker.byline')}
      </Paragraph>
      <Box
        background='light-1'
        border= {{ color: 'light-5', size: 'xsmall'}}
        overflow="scroll"
      >
        <Grid
          alignContent='stretch'
          columns={[`repeat(${columns}, minmax(200px, 1fr))`]}
          gap='small'
          pad='medium'
        >
        {workflow?.subjectSets.map(subjectSet => {
          const href = `${baseUrl}/workflow/${workflow.id}/subject-set/${subjectSet.id}`
          const panoptesCompleteness = subjectSet.completeness[workflow.id]
          subjectSet.completeness = panoptesCompleteness
          return (
            <Link
              key={subjectSet.id}
              href={addQueryParams(href, router)}
              passHref
            >
              <Anchor>
                <SubjectSetCard {...subjectSet } />
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
    Base URL for links eg. `/projects/${owner}/${project}/classify`
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
