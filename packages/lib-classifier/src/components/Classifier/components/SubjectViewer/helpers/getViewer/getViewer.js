import SingleImageViewer from '../../components/SingleImageViewer'

const viewers = {
  singleImage: SingleImageViewer
}

function getViewer (viewer) {
  return viewers[viewer]
}

export default getViewer
