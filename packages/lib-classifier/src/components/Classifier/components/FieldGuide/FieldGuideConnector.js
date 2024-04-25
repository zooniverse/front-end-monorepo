import { withStores } from '@helpers'
import FieldGuideWrapper from './FieldGuideWrapper'

function storeMapper(classifierStore) {
  const {
    locale,
    fieldGuide: {
      active: fieldGuide,
      attachedMedia: icons
    },
    subjectViewer: {
      separateFramesView
    }
  } = classifierStore

  return {
    locale,
    fieldGuide,
    icons,
    separateFramesView
  }
}

export default withStores(FieldGuideWrapper, storeMapper)
