import { Modal } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Grid } from 'grommet'
import Link from 'next/link'
import { bool, number, shape, string } from 'prop-types'
import React from 'react'


import en from './locales/en'

counterpart.registerTranslations('en', en)

function SubjectSetPicker (props) {
  const { active, closeFn, workflow } = props

  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title="Select a subject set"
    >
      <Grid
        columns={[`repeat(10, minmax(100px, 1fr))`]}
      >
      {workflow.subjectSets.map(subjectSet => {
        return (
          <p>
            <Link
              as={`/classify/workflow/${workflow.id}/subject-set/${subjectSet}`}
              href="/classify/workflow/[workflowID]/subject-set/[subjectSetID]"
            >
              {subjectSet}
            </Link>
          </p>
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
