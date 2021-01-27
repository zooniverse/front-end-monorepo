import { PlainButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Grid, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import { array, bool, func, number, shape, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

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

function BackButton({ onClick }) {
  return (
    <PlainButton
      onClick={onClick}
      text={counterpart('SubjectSetPicker.back')}
    />
  )
}
function SubjectSetPicker (props) {
  const { onClose, owner, project, workflow } = props
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
      {onClose && <BackButton onClick={onClose} />}
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
          return (
            <Link
              key={subjectSet.id}
              as={`/projects/${owner}/${project}/classify/workflow/${workflow.id}/subject-set/${subjectSet.id}`}
              href="/projects/[owner]/[project]/classify/workflow/[workflowID]/subject-set/[subjectSetID]"
              passHref
            >
              <Anchor>
                <SubjectSetCard {...subjectSet} />
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
  onClose: func,
  owner: string.isRequired,
  project: string.isRequired,
  workflow: shape({
    completeness: number,
    default: bool,
    display_name: string,
    id: string,
    subjectSets: array
  }).isRequired
}

export default SubjectSetPicker
export { BackButton, StyledHeading }
