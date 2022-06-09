import React from 'react'
import { withStores } from '@helpers'

function storeMapper(classifierStore) {
  const project = classifierStore?.projects.active
  return { project }
}

/**
  Check project.experimental_tools for a feature flag, before rendering a component.
*/
export default function withFeatureFlag(
  Component,
  featureFlag
) {

  function WithFeatureFlag({
    project,
    ...props
  }) {
    if (project?.experimental_tools.includes(featureFlag)) {
      return <Component {...props} />
    }
    return null
  }
  return withStores(WithFeatureFlag, storeMapper)
}