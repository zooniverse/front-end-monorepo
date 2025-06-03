import { object } from 'prop-types'
import { useState } from 'react'
import { ComponentFull } from '../components/ComponentFull.js'
import { ModelViewer } from '../models/ModelViewer.js'
import { useEffect } from 'react'
import { useVolumetricSubject } from '../../hooks/useVolumetricSubject.js'

export default function VolumetricView ({ subject }) {
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
      : <ComponentFull
          data-testid='subject-viewer-volumetric'
          data={data}
          models={modelState}
        />
}

VolumetricView.propTypes = {
  subject: object
}
