import { Stroke, Style } from 'ol/style'

import asMSTFeature from './asMSTFeature'
import { SUBJECT_OUTLINE_COLOR, SUBJECT_OUTLINE_WIDTH } from './constants'

// Subjects can carry geometries no drawing tool makes, such as the survey-area
// polygon a mapping subject is scoped to. Outline them so volunteers can see the
// area they are working in; no fill, so the imagery stays readable.
const subjectStyle = new Style({
  stroke: new Stroke({ color: SUBJECT_OUTLINE_COLOR, width: SUBJECT_OUTLINE_WIDTH })
})

export default function getFeatureStyle({ feature, geoDrawingTask, isSelected = false, resolution }) {
  const mstFeature = asMSTFeature(feature)
  if (!mstFeature) {
    return feature?.getGeometry?.() ? subjectStyle : null
  }
  return mstFeature.getStyles({ feature, geoDrawingTask, isSelected, resolution })
}
