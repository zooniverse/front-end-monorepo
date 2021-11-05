import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import TranscriptionReductions from '@store/SubjectStore/Subject/TranscriptionReductions'
import { reducedSubject } from '@store/SubjectStore/Subject/TranscriptionReductions/mocks'
import TranscribedLinesConnector from './TranscribedLinesConnector'
import TranscribedLines from './TranscribedLines'

describe('Component > TranscribedLinesConnector', function () {
  let mockUseContext
  const mockStoresWithTranscriptionTask = {
    subjects: {
      active: {
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
        transcriptionReductions: transcriptionReductions
      }
    }
  })

  const mockStoresWithoutTranscriptionTask = {
    subjects: {
      active: {
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

  afterEach(function () {
    mockUseContext.restore()
  })

  it('should render without crashing', function () {
    mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
      return {
        classifierStore: mockStoresWithTranscriptionTask
      }
    })
    const wrapper = shallow(<TranscribedLinesConnector />)
    expect(wrapper).to.be.ok()
  })

  describe('when the workflow does not have a transcription task', function () {
    it('should not render TranscribedLines', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithoutTranscriptionTask
        }
      })
      const wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(0)
    })
  })

  describe('when the subject does not have consensus lines', function () {
    it('should not render TranscribedLines', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithTranscriptionTask
        }
      })
      const wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(0)
    })
  })

  describe('when the workflow does have a transcription task and subject does have consensus lines', function () {
    it('should render TranscribedLines', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithTranscriptionTaskAndConsensusLines
        }
      })
      const wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(1)
      expect(wrapper.find(TranscribedLines).prop('lines')).to.have.lengthOf(transcriptionReductions.consensusLines(0).length)
    })

    it('should render lines per frame', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, { subjectViewer: { frame: 1 } })
        }
      })
      const wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.find(TranscribedLines).prop('lines')).to.have.lengthOf(transcriptionReductions.consensusLines(1).length)
    })

    it('should not render TranscribedLines if no lines per frame', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, { subjectViewer: { frame: 3 } })
        }
      })
      const wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(transcriptionReductions.consensusLines(3).length)
    })

    it('should not render TranscribedLines if showing only user marks', function () {
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
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, taskShowingOnlyUserMarks)
        }
      })
      const wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(0)
    })

    it('should not render TranscribedLines if hiding all marks', function () {
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
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, taskHidingAllMarks)
        }
      })
      const wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.find(TranscribedLines)).to.have.lengthOf(0)
    })

    it('should pass along if the step\'s tasks are in an invalid state', function () {
      let wrapper
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithTranscriptionTaskAndConsensusLines
        }
      })
      wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.props().invalidMark).to.be.false()
      mockUseContext.restore()
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: Object.assign({}, mockStoresWithTranscriptionTaskAndConsensusLines, { 
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
        }
      })
      wrapper = shallow(<TranscribedLinesConnector />)
      expect(wrapper.props().invalidMark).to.be.true()
    })
  })
})
