import ReactDOM from 'react-dom'
import App from './components/App'

function getQueryParams() {
  if (window.location) {
    const url = new URL(window.location)
    const { searchParams } = url
    const queryParams = {}
    searchParams.forEach((value, key) => {
      queryParams[key] = value
    })
    return queryParams
  }

  return {}
}

const { language, subject, subjectSet, workflow } = getQueryParams()
ReactDOM.render(<App locale={language} subjectID={subject} subjectSetID={subjectSet} workflowID={workflow} />, document.getElementById('root'))
