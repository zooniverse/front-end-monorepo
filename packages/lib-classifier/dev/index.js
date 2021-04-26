import queryString from 'query-string'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

function getQueryParams() {
  if (window.location && window.location.search) {
    const { subject, subjectSet, workflow } = queryString.parse(window.location.search)
    return { subject, subjectSet, workflow }
  }

  return {}
}

const { subject, subjectSet, workflow } = getQueryParams()
ReactDOM.render(<App subjectID={subject} subjectSetID={subjectSet} workflowID={workflow} />, document.getElementById('root'))
