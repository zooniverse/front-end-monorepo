import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import { useSubjectText } from '@hooks'
import Selection from '@plugins/tasks/experimental/highlighter/components/components/Selection'
import locationValidator from '../../helpers/locationValidator'
import SingleTextViewer from './SingleTextViewer'

const defaultSubject = {
  id: '',
  locations: []
}

function labeledContent (data, annotation) {
  const newContent = []
  let lastFocusIndex = 0
  let dataIndex = 0
  const { deleteHighlight, value } = annotation
  for (dataIndex = 0; dataIndex < data.length; dataIndex++) {
    for (const highlight of value) {
      if (highlight.start === dataIndex) {
        // 1. add text between last label and current label
        const preContent = data.slice(lastFocusIndex, dataIndex)
        newContent.push(preContent)
        // 2. add the highlighted content, push content to be labeled
        const newLabel =
          <Selection
            key={`${highlight.start}-${highlight.end}`}
            color={highlight.labelInformation.color}
            handleDelete={() => deleteHighlight(value.indexOf(highlight))}
            label={highlight.labelInformation.label}
            text={highlight.text}
          />
        newContent.push(newLabel)
        // 3. re-set last focusIndex with annotation index
        lastFocusIndex = highlight.end + 1
      }
    }
  }
  // 4. if last character in the string, add the remaining content
  const endContent = data.slice(lastFocusIndex, dataIndex)
  newContent.push(endContent)
  return newContent
}

function DEFAULT_HANDLER() {
  return true
}

export function SingleTextViewerContainer ({
  frame = 0,
  height = '',
  latest,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject = defaultSubject
}) {
  const { data, error, loading } = useSubjectText({
    frame,
    subject,
    onReady,
    onError
  })
  
  let highlighterAnnotation, content
  
  if (latest) {
    ([ highlighterAnnotation ] = latest?.annotations?.filter(annotation => annotation.taskType === 'highlighter'))
  }
  
  if (loadingState === asyncStates.error) {
    return <p>Something went wrong. {error?.message}</p>
  }

  if (loadingState !== asyncStates.initialized) {
    if (highlighterAnnotation && highlighterAnnotation.value.length > 0) {
      content = labeledContent(data, highlighterAnnotation)
    } else {
      content = [data]
    }

    return (
      <SingleTextViewer
        content={content}
        height={height}
        subjectId={subject.id}
      />
    )
  }

  return null
}

SingleTextViewerContainer.propTypes = {
  height: PropTypes.string,
  latest: PropTypes.shape({
    annotations: PropTypes.array
  }),
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  }),
}

export default observer(SingleTextViewerContainer)
