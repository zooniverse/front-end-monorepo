import { func, object, string } from 'prop-types'
import { useEffect, useState } from 'react'
import { ComponentViewer } from './components/ComponentViewer.js'
import { ModelViewer } from './models/ModelViewer.js'
import { ModelAnnotations } from './models/ModelAnnotations.js'
import { ModelTool } from './models/ModelTool.js'
import { useSubjectJSON } from './../hooks/useSubjectJSON.js'
import asyncStates from '@zooniverse/async-states'

const DEFAULT_HANDLER = () => {}

export default function VolumetricViewer ({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const [subjectData, setSubjectData] = useState({ error: null, data: null })
  const [modelState] = useState({
    annotations: ModelAnnotations(),
    tool: ModelTool(),
    viewer: ModelViewer()
  })

  useEffect(() => {
    useSubjectJSON({ setSubjectData, subject })
  }, [subject])

  useEffect(() => {
    if (subjectData.error) onError(subjectData.error)
    if (subjectData.data) onReady()
  }, [subjectData])

  if (loadingState === asyncStates.initialized) {
    return <p>Async Initialized...</p>
  } else if (loadingState === asyncStates.loading) {
    return <p>Async Loading...</p>
  } else if (loadingState === asyncStates.error) {
    return <p>Async Error</p>
  } else if (subjectData.error) {
    return <p>SubjectData Error</p>
  } else if (subjectData.data === null) {
    return <p>No subject data</p>
  } else {
    return (
      <ComponentViewer
        data-testid="subject-viewer-volumetric"
        config={{}}
        data={subjectData.data}
        models={modelState}
      />
    )
  }
}

export const VolumetricViewerData = ({ subjectData = '', subjectUrl = '' }) => {
  return {
    data: {
      config: {},
      subjectData,
      subjectUrl,
      models: {
        annotations: ModelAnnotations(),
        tool: ModelTool(),
        viewer: ModelViewer()
      }
    },
    component: VolumetricViewer
  }
}

VolumetricViewer.propTypes = {
  loadingState: string,
  onError: func,
  onReady: func,
  subject: object
}
