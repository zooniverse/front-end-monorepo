import { func, object, string } from 'prop-types'
import { useState } from 'react'
import { ComponentViewer } from './components/ComponentViewer.js'
import { ModelViewer } from './models/ModelViewer.js'
import { ModelAnnotations } from './models/ModelAnnotations.js'
import { ModelTool } from './models/ModelTool.js'
import { useEffect } from 'react'
import { useVolumetricSubject } from './../hooks/useVolumetricSubject.js'
import asyncStates from '@zooniverse/async-states'

const DEFAULT_HANDLER = () => {}

export default function VolumetricViewer ({
  loadingState = asyncStates.success,
  onAnnotation = DEFAULT_HANDLER,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject,
  view = 'default', // 'default' | 'preview'
}) {
  const { data, loading, error } = useVolumetricSubject({
    onError,
    onReady,
    subject: JSON.parse(JSON.stringify(subject)) // doesn't work properly with MobX-structured subjects
  })

  const [modelState, setModelState] = useState({})

  // Ensures model setup is only run once
  useEffect(() => {
    setModelState({
      annotations: ModelAnnotations({ onAnnotation }),
      tool: ModelTool(),
      viewer: ModelViewer()
    })
  }, [])

  const isLoading = loadingState === asyncStates.initialized ||
    loadingState === asyncStates.loading ||
    loading
  const isError = loadingState === asyncStates.error ||
    error ||
    data === null

  // Specs should skip rendering the VolumetricViewer component
  // WebGL/Canvas throws exceptions when running specs due to non-browser environment
  return (data === 'mock-subject-json')
    ? <div data-testid='subject-viewer-volumetric' />
    : (isLoading)
        ? <p>Loading...</p>
        : (isError)
            ? <p>Error</p>
            : <ComponentViewer
                data-testid='subject-viewer-volumetric'
                config={{}}
                data={data}
                models={modelState}
                view={view}
              />
}

export const VolumetricViewerData = ({
  onAnnotation = DEFAULT_HANDLER,
  subjectData = '',
  subjectUrl = ''
}) => {
  return {
    data: {
      config: {},
      subjectData,
      subjectUrl,
      models: {
        annotations: ModelAnnotations({ onAnnotation }),
        tool: ModelTool(),
        viewer: ModelViewer()
      }
    },
    component: VolumetricViewer
  }
}

VolumetricViewer.propTypes = {
  loadingState: string,
  onAnnotation: func,
  onError: func,
  onReady: func,
  subject: object,
  view: string
}
