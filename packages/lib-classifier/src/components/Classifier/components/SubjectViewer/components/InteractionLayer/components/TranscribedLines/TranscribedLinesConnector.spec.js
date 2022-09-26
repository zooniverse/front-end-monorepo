import { shallow } from 'enzyme'
import React from 'react'
import TranscriptionReductions from '@store/subjects/Subject/TranscriptionReductions'
import { reducedSubject } from '@store/subjects/Subject/TranscriptionReductions/mocks'
import TranscribedLinesConnector from './TranscribedLinesConnector'
import TranscribedLines from './TranscribedLines'

describe('Component > TranscribedLinesConnector', function () {
  const stepHistory = {
    latest: {
      annotations: []
    }
  }
  const mockStoresWithTranscriptionTask = {
    subjects: {
      active: {
        stepHistory,
        transcriptionReductions: {
          consensusLines: () => []
        }
      }
    },
    subjectViewer: {
      frame: 0
    },
    workflows: {
      active: {
        usesTranscriptionTask: true
      }
    },
    workflowSteps: {
      active: {
        isValid: true
      },
      activeStepTasks: [
        {
          shownMarks: 'ALL',
          type: 'transcription'
        }
      ],
      findTasksByType: () => {
        return [{
          shownMarks: 'ALL',
          type: 'transcription'
        }]
      }
    }
  }

  const transcriptionReductions = TranscriptionReductions.create({
    reductions: [{ data: reducedSubject }],
    subjectId: '1234',
    workflowId: '5678'
  })

  const mockStoresWithTranscriptionTaskAndConsensusLines = Object.assign({}, mockStoresWithTranscriptionTask, {
    subjects: {
      active: {
        stepHistory,
        transcriptionReductions: transcriptionReductions
      }
    }
  })

  const mockStoresWithoutTranscriptionTask = {
    subjects: {
      active: {
        stepHistory,
        transcriptionReductions: {
          consensusLines: () => []
        }
      }
    },
    subjectViewer: {
      frame: 0
    },
    workflows: {
      active: {
        usesTranscriptionTask: false
      }
    },
    workflowSteps: {
      active: {
        isValid: true
      },
      activeStepTasks: [
        {
          shownMarks: 'ALL',
          type: 'drawing'
        }
      ],
      findTasksByType: () => { return [] }
    }
  }

  it('should render without crashing', function () {
    const store = mockStoresWithTranscriptionTask
    const wrapper = shallow(<TranscribedLinesConnector store={store} />)
    expect(wrapper).to.be.ok()
  })

  describe('when the workflow does not have a transcription task', function () {
    it('should hide TranscribedLines', function () {
      const store = mockStoresWithoutTranscriptionTask
      const wrapper = shallow(<TranscribedLinesConnector store={store} />).find(TranscribedLines)
      expect(wrapper.prop('visible')).to.be.false()
    })
  })

  describe('when the subject does not have consensus lines', function () {
    it('should hide TranscribedLines', function () {
      const store= mockStoresWithTranscriptionTask
      const wrapper = shallow(<TranscribedLinesConnector store={store} />).find(TranscribedLines)
      expect(wrapper.prop('visible')).to.be.false()
    })
  })

  describe('when the workflow does have a transcription task and subject does have consensus lines', function () {
    it('should show TranscribedLines', function () {
      const store = mockStoresWithTranscriptionTaskAndConsensusLines
      const wrapper = shallow(<TranscribedLinesConnector store={store} />).find(TranscribedLines)
      expect(wrapper.prop('visible')).to.be.true()
      expect(wrapper.prop('lines')).to.have.lengthOf(transcriptionReductions.consensusLines(0).length)
    })

    it('should render lines per frame', function () {
      const store = Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, { subjectViewer: { frame: 1 } })
      const wrapper = shallow(<TranscribedLinesConnector store={store} />).find(TranscribedLines)
      expect(wrapper.prop('lines')).to.have.lengthOf(transcriptionReductions.consensusLines(1).length)
    })

    it('should hide TranscribedLines if no lines per frame', function () {
      const store = Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, { subjectViewer: { frame: 3 } })
      const wrapper = shallow(<TranscribedLinesConnector store={store} />).find(TranscribedLines)
      expect(wrapper.prop('visible')).to.be.false()
    })

    it('should hide TranscribedLines if showing only user marks', function () {
      const taskShowingOnlyUserMarks = {
        workflowSteps: {
          activeStepTasks: [
            {
              shownMarks: 'USER',
              type: 'transcription'
            }
          ],
          findTasksByType: () => {
            return [{
              shownMarks: 'USER',
              type: 'transcription'
            }]
          }
        }
      }
      const store = Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, taskShowingOnlyUserMarks)
      const wrapper = shallow(<TranscribedLinesConnector store={store} />).find(TranscribedLines)
      expect(wrapper.prop('visible')).to.be.false()
    })

    it('should hide TranscribedLines if hiding all marks', function () {
      const taskHidingAllMarks = {
        workflowSteps: {
          activeStepTasks: [
            {
              shownMarks: 'NONE',
              type: 'transcription'
            }
          ],
          findTasksByType: () => {
            return [{
              shownMarks: 'NONE',
              type: 'transcription'
            }]
          }
        }
      }
      const store = Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, taskHidingAllMarks)
      const wrapper = shallow(<TranscribedLinesConnector store={store} />).find(TranscribedLines)
      expect(wrapper.prop('visible')).to.be.false()
    })

    it('should pass along if the step\'s tasks are in an invalid state', function () {
      let wrapper
      let store = mockStoresWithTranscriptionTaskAndConsensusLines
      wrapper = shallow(<TranscribedLinesConnector store={store} />).dive()
      expect(wrapper.props().invalidMark).to.be.false()
      store = Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, { 
        workflowSteps: { 
          active:  {
            isValid: false
          },
          activeStepTasks: [
            {
              shownMarks: 'ALL',
              type: 'transcription'
            }
          ],
          findTasksByType: () => {
            return [{
              shownMarks: 'ALL',
              type: 'transcription'
            }]
          }
        }
      })
      wrapper = shallow(<TranscribedLinesConnector store={store} />).find(TranscribedLines)
      expect(wrapper.props().invalidMark).to.be.true()
    })
  })
})
