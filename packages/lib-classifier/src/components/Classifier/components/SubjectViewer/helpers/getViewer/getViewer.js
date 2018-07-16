import SingleImageViewer from '../../components/SingleImageViewer'

const viewers = {
  singleImage: SingleImageViewer
}

function getViewer (viewer) {
  return viewers[viewer] || null
}

export default getViewer
