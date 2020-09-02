import { Modal } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Grid } from 'grommet'
import Link from 'next/link'
import { bool, number, shape, string } from 'prop-types'
import React from 'react'


import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectSetCard (props) {
  const { display_name, set_member_subjects_count } = props
  return (
    <>
      <p>{display_name}</p>
      <p>Subjects: {set_member_subjects_count}</p>
    </>
  )
}

function SubjectSetPicker (props) {
  const { active, closeFn, owner, project, workflow } = props

  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title="Select a subject set"
    >
      <Grid
        columns={[`repeat(5, minmax(200px, 1fr))`]}
      >
      {workflow.subjectSets.map(subjectSet => {
        return (
          <div>
            <Link
              as={`/projects/${owner}/${project}/classify/workflow/${workflow.id}/subject-set/${subjectSet.id}`}
              href="/projects/[owner]/[project]/classify/workflow/[workflowID]/subject-set/[subjectSetID]"
            >
              <a>
                <SubjectSetCard {...subjectSet} />
              </a>
            </Link>
          </div>
        )
      })}
      </Grid>
    </Modal>
  )
}

SubjectSetPicker.propTypes = {
  workflow: shape({
    completeness: number,
    default: bool,
    displayName: string.isRequired,
    id: string
  }).isRequired
}

export default SubjectSetPicker
