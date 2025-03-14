import { withStores } from '@helpers'
import FieldGuideWrapper from './FieldGuideWrapper'

function storeMapper(classifierStore) {
  const {
    locale,
    fieldGuide: {
      active: fieldGuide,
      attachedMedia: icons
    }
  } = classifierStore

  return {
    locale,
    fieldGuide,
    icons
  }
}

export default withStores(FieldGuideWrapper, storeMapper)
