import React from 'react'

/**
  Check APP_ENV, the deployment environment, before rendering a component.
*/
export default function withEnvironments(
  Component,
  environments
) {

  const environment = process.env.APP_ENV || 'development'

  return function WithEnvironments(props) {
    const allowedEnvironments = environments.split(',')
    if (allowedEnvironments.includes(environment)) {
      return <Component {...props} />
    }
    return null
  }
}