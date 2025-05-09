import { object } from 'prop-types'
import { useState } from 'react'
import { ComponentPreview } from '../components/ComponentPreview.js'
import { ModelViewer } from '../models/ModelViewer.js'
import { useEffect } from 'react'
import { useVolumetricSubject } from '../../hooks/useVolumetricSubject.js'

export default function VolumetricPreview ({ subject }) {
  const { data, loading, error } = useVolumetricSubject({ subject })
  const [modelState, setModelState] = useState(null)

  useEffect(() => {
    if (!data) return

    const state = { viewer: ModelViewer() }
    state.viewer.initialize({ data })
    
    setModelState(state)
  }, [data])

  return (loading)
    ? <p>Loading...</p>
    : (error || data === null || modelState === null)
      ? <p>Error</p>
      : <ComponentPreview
          data-testid='subject-viewer-volumetric'
          config={{}}
          data={data}
          models={modelState}
        />
}

VolumetricPreview.propTypes = {
  subject: object,
}
