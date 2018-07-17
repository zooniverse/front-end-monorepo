import { inject, observer } from 'mobx-react'
import React from 'react'

import SingleAnswer from './components/SingleAnswer'

const answerTypes = {
  single: SingleAnswer,
  default: null
}

const answerTypeMapper = type => answerTypes[type] || answerTypes.default

function storeMapper (stores) {
  const { type: questionType } = stores.classifierStore.tasks.active
  return { questionType }
}

@inject(storeMapper)
@observer
class Answer extends React.Component {
  render () {
    const Component = answerTypeMapper(this.props.questionType)
    return <Component />
  }
}

export default Answer
