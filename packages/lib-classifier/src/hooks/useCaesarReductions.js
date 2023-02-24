import { captureException } from '@sentry/browser'
import { useEffect, useState } from 'react'

import { useStores } from '@hooks'

async function fetchReductions(caesarClient, reducerKey, subjectID, workflowID) {
  if (reducerKey) {
    try {
      const query = `{
        workflow(id: ${workflowID}) {
          subject_reductions(subjectId: ${subjectID}, reducerKey:"${reducerKey}")
          {
            data
          }
        }
      }`
      const response = await caesarClient.request(query.replace(/\s+/g, ' '))
      return response?.workflow?.subject_reductions
    } catch (error) {
      captureException(error)
      console.error(error)
      return []
    }
  }
  return []
}

export default function useCaesarReductions(reducerKey) {
  const [loaded, setLoaded] = useState(false)

  const {
    client: {
      caesar
    },
    subjects: {
      active: subject
    },
    workflows: {
      active: workflow
    }
  } = useStores()

  useEffect(function onSubjectChange() {
    async function updateReductions(caesarClient, reducerKey, subject, workflow) {
      const reductions = await fetchReductions(caesarClient, reducerKey, subject.id, workflow.id)
      subject.setCaesarReductions({
        reducer: reducerKey,
        subjectId: subject.id,
        workflowId: workflow.id,
        reductions
      })
      setLoaded(true)
    }

    if (subject?.id && reducerKey) {
      setLoaded(false)
      updateReductions(caesar, reducerKey, subject, workflow)
    }
  }, [caesar, reducerKey, subject, workflow])

  return {
    loaded,
    caesarReductions: subject.caesarReductions
  }
}