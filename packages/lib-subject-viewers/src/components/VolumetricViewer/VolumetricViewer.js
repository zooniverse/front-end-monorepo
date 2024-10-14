import { object, string } from 'prop-types'
import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import { ComponentViewer } from './components/ComponentViewer.js'
import { ModelViewer } from './models/ModelViewer.js'
import { ModelAnnotations } from './models/ModelAnnotations.js'
import { ModelTool } from './models/ModelTool.js'

export default function VolumetricViewerComponent ({
  config = {},
  subjectData = '',
  subjectUrl = '',
  models
}) {
  const [data, setData] = useState(null)
  if (!models) {
    const [modelState] = useState({
      annotations: ModelAnnotations(),
      tool: ModelTool(),
      viewer: ModelViewer()
    })
    models = modelState
  }

  // Figure out subject data
  useEffect(() => {
    if (subjectData !== '') {
      setData(Buffer.from(subjectData, 'base64'))
    } else if (subjectUrl !== '') {
      fetch(subjectUrl)
        .then((res) => res.json())
        .then((data) => {
          setData(Buffer.from(data, 'base64'))
        })
    } else {
      console.log('No data to display')
    }
  }, [])

  // Loading screen will always display if we have no subject data
  if (!data || !models) return <div>Loading...</div>

  return (
    <ComponentViewer
      config={config}
      data={data}
      models={models}
    />
  )
}

export const VolumetricViewerData = (config) => {
  return {
    config: {
      subjectData: config?.subjectData ?? '',
      subjectUrl: config?.subjectUrl ?? '',
      models: {
        annotations: ModelAnnotations(),
        tool: ModelTool(),
        viewer: ModelViewer()
      }
    },
    component: VolumetricViewerComponent
  }
}

VolumetricViewerComponent.propTypes = {
  config: object,
  subjectData: string,
  subjectUrl: string,
  models: object
}
