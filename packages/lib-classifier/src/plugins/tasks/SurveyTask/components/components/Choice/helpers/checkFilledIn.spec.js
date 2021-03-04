import checkFilledIn from './checkFilledIn'
import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'

// choice without questions: fire, id = 'FR'

// choice with questions, none required: human, id = 'HMN'

// choice with questions, some required: buffalo, id = 'BFFL'

describe('Function > checkFilledIn', function () {
  it('should be a function', function () {
    expect(checkFilledIn).to.be.a('function')
  })

  it('should return true if there are no questions', function () {
    expect(checkFilledIn({}, 'FR', mockTask)).to.be.true()
  })

  it('should return true if the questions are not required', function () {
    expect(checkFilledIn({}, 'HMN', mockTask)).to.be.true()
  })

  it('should return true if required questions are complete', function () {
    expect(checkFilledIn({ HWMN: '3', WHTBHVRSDS: ['MVNG'] }, 'BFFL', mockTask)).to.be.true()
  })

  it('should return false if any required questions are incomplete', function () {
    expect(checkFilledIn({}, 'BFFL', mockTask)).to.be.false()
  })
})
