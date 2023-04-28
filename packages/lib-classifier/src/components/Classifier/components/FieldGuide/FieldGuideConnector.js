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
      showImageToolbar
    }
  } = classifierStore

  return {
    locale,
    fieldGuide,
    icons,
    showImageToolbar
  }
}

export default withStores(FieldGuideWrapper, storeMapper)
