import getQuestionIds from './getQuestionIds'
import { task as mockTask } from '@plugins/tasks/survey/mock-data'

// choice without questions: fire, id = 'FR'

// choice with questions, not included in questionsMap: hyena, id = 'HN'

// choice with questions, included in questionsMap, different questions than questionsOrder: honey badger, id = 'HNBDGR'

describe('Function > getQuestionIds', function () {
  it('should be a function', function () {
    expect(getQuestionIds).to.be.a('function')
  })

  it('should return an empty array if the choice noQuestions property is true', function () {
    expect(getQuestionIds('FR', mockTask)).to.be.a('array')
    expect(getQuestionIds('FR', mockTask)).to.have.lengthOf(0)
  })

  it('should return the task questionsOrder if the choice is not included in the task questionsMap', function () {
    expect(getQuestionIds('HN', mockTask)).to.be.equal(mockTask.questionsOrder)
  })

  it('should return the task questionsMap for the choice if the choice is included in the task questionsMap', function () {
    expect(getQuestionIds('HNBDGR', mockTask)).to.equal(mockTask.questionsMap.HNBDGR)
  })
})
