import { getSnapshot } from 'mobx-state-tree'

import { useStores } from '@hooks'

import JSONDataViewer from '../../SubjectViewer/components/JSONDataViewer'

function storeMapper(classifierStore) {
  const {
    classifications: {
      currentAnnotations: annotations
    },
    feedback: {
      applicableRules,
      showModal: feedback
    },
    subjects: {
      active: subject
    }
  } = classifierStore

  return {
    annotations,
    applicableRules,
    feedback,
    subject
  }
}

function Graph2dRangeFeedback() {
  const {
    annotations = [],
    applicableRules = [],
    feedback = false,
    subject = null
  } = useStores(storeMapper)

  const annotationBrushes = []
  annotations.forEach(annotation => {
    const { value } = getSnapshot(annotation)
    value?.forEach((marking, i) => {
      const markingBrush = {
        id: i,
        maxX: (marking.x + (marking.width / 2)),
        minX: (marking.x - (marking.width / 2))
      }
      annotationBrushes.push(markingBrush)
    })
  })

  const ruleBrushes = applicableRules.map(rule => {
    return {
      id: rule.id,
      maxX: (parseFloat(rule.x) + (parseFloat(rule.width) / 2) + parseFloat(rule.tolerance)),
      minX: (parseFloat(rule.x) - (parseFloat(rule.width) / 2) - parseFloat(rule.tolerance)),
      success: rule.success
    }
  })

  return (
    <JSONDataViewer
      disabled
      subject={subject}
      feedback={feedback}
      feedbackBrushes={[...annotationBrushes, ...ruleBrushes]}
    />
  )
}

export default Graph2dRangeFeedback
