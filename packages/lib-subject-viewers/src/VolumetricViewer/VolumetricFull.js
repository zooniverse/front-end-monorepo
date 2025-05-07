import { func, object, string } from 'prop-types'
import { useState } from 'react'
import { AlgorithmAStar } from './helpers/AlgorithmAStar'
import { ComponentFull } from './components/ComponentFull.js'
import { ModelViewer } from './models/ModelViewer.js'
import { ModelAnnotations } from './models/ModelAnnotations.js'
import { ModelTool } from './models/ModelTool.js'
import { useEffect } from 'react'
import { useVolumetricSubject } from './../hooks/useVolumetricSubject.js'
import asyncStates from '@zooniverse/async-states'

const DEFAULT_HANDLER = () => {}

export default function VolumetricFull ({
  loadingState = asyncStates.success,
  onAnnotation = DEFAULT_HANDLER,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject,
}) {
  const { data, loading, error } = useVolumetricSubject({
    onError,
    onReady,
    subject
  })

  const [modelState, setModelState] = useState(null)

  useEffect(() => {
    if (!data) return

    const state = {
      annotations: ModelAnnotations({ onAnnotation }),
      tool: ModelTool(),
      viewer: ModelViewer()
    };

    state.annotations.initialize({
      algorithm: AlgorithmAStar,
      viewer: state.viewer
    })

    state.tool.initialize({
      annotations: state.annotations
    })

    state.viewer.initialize({
      annotations: state.annotations,
      data,
      tool: state.tool
    })
    
    setModelState(state)
  }, [data])

  const isLoading = loadingState === asyncStates.initialized ||
    loadingState === asyncStates.loading ||
    loading || 
    modelState === null
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
            : <ComponentFull
                data-testid='subject-viewer-volumetric'
                data={data}
                models={modelState}
              />
}

VolumetricFull.propTypes = {
  loadingState: string,
  onAnnotation: func,
  onError: func,
  onReady: func,
  subject: object,
  view: string
}
