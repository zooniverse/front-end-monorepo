function isAnnotationWithinTolerance(rule, annotation) {
  const annotationX = annotation.x;
  const annotationY = annotation.y;
  const feedbackX = rule.x;
  const feedbackY = rule.y;
  const tolerance = rule.tolerance;

  // Math.pow is a restricted property, but using the exponential operator (**)
  // breaks the build :(
  /* eslint-disable no-restricted-properties */
  const distance = Math.sqrt(
    Math.pow((annotationY - feedbackY), 2)
    + Math.pow((annotationX - feedbackX), 2)
  );
  /* eslint-enable no-restricted-properties */

  return distance < tolerance;
}

// Determines whether there are any annotations falling within tolerance for a
// rule, and appends all successful annotations if so.
function radialReducer(rule, annotations = []) {
  const result = annotations.filter(annotation => isAnnotationWithinTolerance(rule, annotation));

  return Object.assign(rule, {
    success: (result.length > 0),
    successfulClassifications: result
  });
}

export default radialReducer;
