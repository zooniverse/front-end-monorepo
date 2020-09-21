import queryString from 'query-string'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

function getQueryParams() {
  if (window.location && window.location.search) {
    const { subjectSet, workflow } = queryString.parse(window.location.search)
    return { subjectSet, workflow }
  }

  return {}
}

const { subjectSet, workflow } = getQueryParams()
ReactDOM.render(<App subjectSetID={subjectSet} workflowID={workflow} />, document.getElementById('root'))
