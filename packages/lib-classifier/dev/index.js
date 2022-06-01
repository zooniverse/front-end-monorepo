import queryString from 'query-string'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

function getQueryParams() {
  if (window.location && window.location.search) {
    const { language, subject, subjectSet, workflow } = queryString.parse(window.location.search)
    return { language, subject, subjectSet, workflow }
  }

  return {}
}

const { language, subject, subjectSet, workflow } = getQueryParams()
ReactDOM.render(<App locale={language} subjectID={subject} subjectSetID={subjectSet} workflowID={workflow} />, document.getElementById('root'))
