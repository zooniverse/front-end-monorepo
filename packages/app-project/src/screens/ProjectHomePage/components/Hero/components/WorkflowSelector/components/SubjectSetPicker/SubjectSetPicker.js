import { Modal, SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Grid, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import { array, bool, number, shape, string } from 'prop-types'
import React from 'react'

import SubjectSetCard from './components/SubjectSetCard'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectSetPicker (props) {
  const { active, closeFn, owner, project, title, workflow } = props

  return (
    <Modal
      active={active}
      closeFn={closeFn}
      headingBackground='brand'
      title={title}
      titleColor='neutral-6'
    >
      <Heading
        level={3}
      >
        {counterpart('SubjectSetPicker.heading')}
      </Heading>
      <Paragraph
        margin={{ top: '0px' }}
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
          columns={[`repeat(5, minmax(200px, 1fr))`]}
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
