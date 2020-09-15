import queryString from 'query-string'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

function getWorkflowID() {
  if (window.location && window.location.search) {
    const { workflow } = queryString.parse(window.location.search) // Search the query string for the 'project='
    if (workflow) {
      return workflow
    }

    return undefined
  }

  return undefined
}

const workflowID = getWorkflowID()
ReactDOM.render(<App workflowID={workflowID} />, document.getElementById('root'))
