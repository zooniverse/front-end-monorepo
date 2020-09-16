import { Modal, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Grid, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import { array, bool, number, shape, string } from 'prop-types'
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

function SubjectSetPicker (props) {
  const { active, closeFn, owner, project, title, workflow } = props
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
    <Modal
      active={active}
      closeFn={closeFn}
      headingBackground='brand'
      title={title}
      titleColor='neutral-6'
    >
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
    </Modal>
  )
}

SubjectSetPicker.propTypes = {
  active: bool,
  title: string.isRequired,
  workflow: shape({
    completeness: number,
    default: bool,
    display_name: string,
    id: string,
    subjectSets: array
  }).isRequired
}

SubjectSetPicker.defaultProps = {
  active: false
}
export default SubjectSetPicker
export { StyledHeading }
