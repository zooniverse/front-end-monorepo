import { AlgorithmAStar } from './../helpers/AlgorithmAStar.js'
import { object, string } from 'prop-types'
import { ComponentViewerDefault } from './ComponentViewerDefault'
import { ComponentViewerPreview } from './ComponentViewerPreview'

const viewers = {
  default: ComponentViewerDefault,
  preview: ComponentViewerPreview
}

export const ComponentViewer = ({
  data,
  models,
  view = 'default'
}) => {
  models.annotations.initialize({
    algorithm: AlgorithmAStar,
    data: [],
    viewer: models.viewer
  })

  models.tool.initialize({
    annotations: models.annotations
  })

  models.viewer.initialize({
    annotations: models.annotations,
    data,
    tool: models.tool
  })

  const ViewComponent = viewers[view];
  return (<ViewComponent data={data} models={models} />)
}

ComponentViewer.propTypes = {
  data: string,
  models: object,
  view: string
}
