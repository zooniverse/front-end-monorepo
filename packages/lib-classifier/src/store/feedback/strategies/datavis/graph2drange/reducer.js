function isAnnotationWithinTolerance (rule, annotation) {
  const annotationX = annotation.x
  const annotationWidth = annotation.width
  const feedbackX = parseFloat(rule.x)
  const feedbackWidth = parseFloat(rule.width)
  const tolerance = parseFloat(rule.tolerance)

  return (
    ((annotationX - (annotationWidth / 2)) > (feedbackX - (feedbackWidth / 2) - tolerance)) &&
    ((annotationX + (annotationWidth / 2)) < (feedbackX + (feedbackWidth / 2) + tolerance))
  )
}

// Determines whether there are any annotations falling within tolerance for a
// rule, and appends all successful annotations if so.
function graph2dRangeReducer (rule, annotations = []) {
  const result = annotations.filter(annotation => isAnnotationWithinTolerance(rule, annotation))

  return Object.assign(rule, {
    success: (result.length > 0),
    successfulClassifications: result
  })
}

export default graph2dRangeReducer
