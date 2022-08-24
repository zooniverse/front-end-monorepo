import React, { forwardRef } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '@hooks'

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

  function WithFeatureFlag(props, ref) {
    const { project } = useStores(storeMapper)
    if (project?.experimental_tools.includes(featureFlag)) {
      return <Component ref={ref} {...props} />
    }
    return null
  }
  return observer(forwardRef(WithFeatureFlag))
}