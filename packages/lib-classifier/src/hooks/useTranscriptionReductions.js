import { auth } from '@zooniverse/panoptes-js'
import { getSnapshot, getType } from 'mobx-state-tree'
import { useEffect } from 'react'
import * as Sentry from '@sentry/browser'

import SHOWN_MARKS from '@helpers/shownMarks'
import { useStores } from '@hooks'
import { getBearerToken } from '@store/utils'
import { useCaesarReductions } from './'

async function checkUser(userIDs = [], authorization) {
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const { data } = await auth.verify(token)
    return data && userIDs.includes(data.id)
  }
  return false
}

function logDuplicateSubject(subjectSnapshot) {
  const subjectError = new Error(`Duplicate transcription subject: ${subjectSnapshot.id}`)
  Sentry.withScope((scope) => {
    scope.setTag('subjectError', 'duplicate')
    scope.setExtra('subject', JSON.stringify(subjectSnapshot))
    Sentry.captureException(subjectError)
  })
}

export default function useTranscriptionReductions() {
  const {
    authClient,
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

  const { loaded, caesarReductions } = useCaesarReductions(workflow.caesarReducer)

  useEffect(function checkTranscriptionUsers() {
    async function checkSubject() {
      const authorization = await getBearerToken(authClient)
      const alreadySeen = await checkUser(caesarReductions?.userIDs, authorization)
      if (!ignore && alreadySeen) {
        const subjectSnapshot = getSnapshot(subject)
        logDuplicateSubject(subjectSnapshot)
        subject.markAsSeen()
      }
    }

    let ignore = false
    if (subject && loaded) {
      checkSubject()
    }
    return () => {
      ignore = true
    }
  }, [loaded, caesarReductions, subject])

  let lines = []
  const activeStepAnnotations = subject?.stepHistory?.latest.annotations
  // We expect there to only be one
  const [task] = findTasksByType('transcription')
  // We want to observe the marks array for changes, so pass that as a separate prop.
  const marks = task?.marks
  // find the corresponding annotation
  const annotation = activeStepAnnotations.find(
    annotation => annotation.task === task?.taskKey
  )
  const invalidMark = !step?.isValid

  if (loaded && getType(caesarReductions).name === 'TranscriptionReductions') {
    lines = caesarReductions.consensusLines(frame)
  }

  const visible = workflow?.usesTranscriptionTask &&
    loaded &&
    task?.shownMarks === SHOWN_MARKS.ALL &&
    lines.length > 0

  const active = step.tasks.find(t => task?.taskKey === t.taskKey)
  return {
    active,
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