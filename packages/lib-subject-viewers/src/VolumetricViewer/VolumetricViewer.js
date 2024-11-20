import { func, object, string } from 'prop-types'
import { useState } from 'react'
import { ComponentViewer } from './components/ComponentViewer.js'
import { ModelViewer } from './models/ModelViewer.js'
import { ModelAnnotations } from './models/ModelAnnotations.js'
import { ModelTool } from './models/ModelTool.js'
import { useVolumetricSubject } from './../hooks/useVolumetricSubject.js'
import asyncStates from '@zooniverse/async-states'

const DEFAULT_HANDLER = () => {}

export default function VolumetricViewer ({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const { data, loading, error } = useVolumetricSubject({ onError, onReady, subject })

  // Specs should skip rendering the VolumetricViewer component
  // WebGL/Canvas throws exceptions when running specs due to non-browser environment
  if (data === 'mock-subject-json')
    return <div data-testid="subject-viewer-volumetric"></div>

  const [modelState] = useState({
    annotations: ModelAnnotations(),
    tool: ModelTool(),
    viewer: ModelViewer()
  })
  
  const isLoading = loadingState === asyncStates.initialized
    || loadingState === asyncStates.loading
    || loading;
  const isError = loadingState === asyncStates.error
    || error
    || data === null;

  return (isLoading)
    ? <p>Loading...</p>
    : (isError)
      ? <p>Error</p>
      : <ComponentViewer
        data-testid="subject-viewer-volumetric"
        config={{}}
        data={data}
        models={modelState}
      />
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
