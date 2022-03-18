import allowIdentification from './allowIdentification'
import { task as mockTask } from '@plugins/tasks/survey/mock-data'

// choice without questions: fire, id = 'FR'

// choice with questions, none required: human, id = 'HMN'

// choice with questions, some required: buffalo, id = 'BFFL'

describe('Function > allowIdentification', function () {
  it('should be a function', function () {
    expect(allowIdentification).to.be.a('function')
  })

  it('should return true if there are no questions', function () {
    expect(allowIdentification({}, 'FR', mockTask)).to.be.true()
  })

  it('should return true if the questions are not required', function () {
    expect(allowIdentification({}, 'HMN', mockTask)).to.be.true()
  })

  it('should return true if required questions are complete', function () {
    expect(allowIdentification({ HWMN: '3', WHTBHVRSDS: ['MVNG'] }, 'BFFL', mockTask)).to.be.true()
  })

  it('should return false if any required questions are incomplete', function () {
    expect(allowIdentification({}, 'BFFL', mockTask)).to.be.false()
  })
})
