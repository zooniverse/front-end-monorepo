import asyncStates from '@zooniverse/async-states'
import { useEffect } from 'react'

const DEFAULT_HANDLER = () => {}

const defaultSubject = {
  id: '',
  locations: []
}

const defaultTarget = {
  clientHeight: 0,
  clientWidth: 0,
  naturalHeight: 0,
  naturalWidth: 0
}

export default function ProtoViewer({
  /*
    loadingState is defined in SubjectViewerStore.js. onReady and onError affect it
    and then it's used below to choose rendering options
  */
  loadingState = asyncStates.initialized,
  /*
    onError is defined in lib-classifier's SubjectViewerStore.js. When called, it sets
    SubjectViewerStore's loadingState to error.
  */
  onError = DEFAULT_HANDLER,
  /*
    onReady is defined in lib-classifier's SubjectViewerStore.js as onSubjectReady().
    It sets the loadingState on the SubjectViewerStore to success. That success triggers
    an update of subjectReadyState in SubjectViewer.js which is passed as loadingState to
    the Viewer *and* the TaskArea, preventing users from making classifications when a subject
    viewer is not ready.
  */
  onReady = DEFAULT_HANDLER,
  subject = defaultSubject
}) {
  /*
    Here's where unique handling of subject data happens every time the subject changes.
    Examples are useSubjectImage() or useSubjectJSON() hooks in lib-classifier.
  */
  useEffect(
    function onSubjectChange() {
      function handleSubject() {} // etc, fetch more subject data if needed
      onReady(defaultTarget)
    },
    [subject]
  )

  /*
    These are the render options. First catch an error if needed,
    then render subject viewer as long as the loadingState says it's okay.
  */
  if (loadingState === asyncStates.error) {
    return <p>Something went wrong.</p>
  }

  if (loadingState !== asyncStates.initialized) {
    return (
      <div>This is the ProtoViewer. Here's the subject ID: {subject.id}</div>
    )
  }

  return null
}
