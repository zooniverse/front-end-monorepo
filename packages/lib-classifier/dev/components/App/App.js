import React from 'react'

import Classifier from '../../../src/components/Classifier'
import project from './projectFixture'

class App extends React.Component {
  render () {
    return (
      <Classifier project={project} />
    )
  }
}

export default App
