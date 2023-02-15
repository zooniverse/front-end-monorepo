import { useEffect, useState } from 'react'
import { applySnapshot } from 'mobx-state-tree'

import SHOWN_MARKS from '@helpers/shownMarks'
import { useStores } from '@hooks'

async function fetchReductions(caesarClient, subjectID, workflow) {
  const query = `{
    workflow(id: ${workflow.id}) {
      subject_reductions(subjectId: ${subjectID}, reducerKey:"${workflow.caesarReducer}")
      {
        data
      }
    }
  }`
  const response = await caesarClient.request(query.replace(/\s+/g, ' '))
  return response?.workflow?.subject_reductions
}

export default function useTranscriptionReductions() {
  const [loaded, setLoaded] = useState(false)

  const {
    client: {
      caesar
    },
    subjects: {
      active: subject
    },
    subjectViewer: {
      frame
    },
    workflows: {
      active: workflow
    },
    workflowSteps: {
      active: step,
      findTasksByType
    }
  } = useStores()

  useEffect(function onSubjectChange() {
    async function updateReductions(caesarClient, subject, workflow) {
      const reductions = await fetchReductions(caesarClient, subject.id, workflow)
      applySnapshot(subject.transcriptionReductions, {
        subjectId: subject.id,
        workflowId: workflow.id,
        reductions
      })
      setLoaded(true)
    }

    if (subject?.id && workflow?.caesarReducer) {
      setLoaded(false)
      updateReductions(caesar, subject, workflow)
    }
  }, [caesar, subject, workflow])

  const lines = subject?.transcriptionReductions?.consensusLines(frame)
  const activeStepAnnotations = subject?.stepHistory.latest.annotations

  // We expect there to only be one
  const [task] = findTasksByType('transcription')
  // We want to observe the marks array for changes, so pass that as a separate prop.
  const marks = task?.marks
  // find the corresponding annotation
  const annotation = activeStepAnnotations.find(
    annotation => annotation.task === task?.taskKey
  )

  const invalidMark = !step?.isValid
  const visible = workflow?.usesTranscriptionTask &&
    loaded &&
    task?.shownMarks === SHOWN_MARKS.ALL &&
    lines.length > 0

  return {
    annotation,
    frame,
    invalidMark,
    lines,
    marks,
    task,
    visible,
    workflow
  }
}