import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import TranscribedLinesContainer from './TranscribedLinesContainer'
import TranscribedLines from './TranscribedLines'

const mockStoresWithTranscriptionTask = {
  subjects: {
    active: {
      transcriptionReductions: {
        consensusLines: []
      }
    }
  },
  workflows: {
    active: {
      usesTranscriptionTask: true
    }
  },
  workflowSteps: {
    activeStepTasks: [
      {
        type: 'transcription'
      }
    ]
  }
}

const mockStoresWithoutTranscriptionTask = {
  subjects: {
    active: {
      transcriptionReductions: {
        consensusLines: []
      }
    }
  },
  workflows: {
    active: {
      usesTranscriptionTask: false
    }
  },
  workflowSteps: {
    activeStepTasks: [
      {
        type: 'drawing'
      }
    ]
  }
}

describe('Component > TranscribedLinesContainer', function () {
  let mockUseContext
  afterEach(function () {
    mockUseContext.restore()
  })

  it('should render without crashing', function () {
    mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
      return {
        classifierStore: mockStoresWithTranscriptionTask
      }
    })
    const wrapper = shallow(<TranscribedLinesContainer />)
    expect(wrapper).to.be.ok()
  })

  describe('when the workflow does not have a transcription task', function () {
    it('should not render TranscribedLines', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithoutTranscriptionTask
        }
      })
      const wrapper = shallow(<TranscribedLinesContainer />)
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(0)
    })
  })

  describe('when the workflow does have a transcription task', function () {
    it('should render TranscribedLines', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithTranscriptionTask
        }
      })
      const wrapper = shallow(<TranscribedLinesContainer />)
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(1)
    })
  })
})