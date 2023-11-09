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
    async function updateReductions(caesarClient, reducerKey, subject, workflowID) {
      const reductions = await fetchReductions(caesarClient, reducerKey, subject.id, workflowID)
      if (!ignore) {
        subject.setCaesarReductions({
          reducer: reducerKey,
          subjectId: subject.id,
          workflowId: workflowID,
          reductions
        })
        setLoaded(true)
      }
    }

    let ignore = false
    if (subject?.id && reducerKey) {
      setLoaded(false)
      updateReductions(caesar, reducerKey, subject, workflow.id)
    }
    return () => {
      ignore = true
    }
  }, [caesar, reducerKey, subject, workflow.id])

  return {
    loaded,
    caesarReductions: subject.caesarReductions
  }
}