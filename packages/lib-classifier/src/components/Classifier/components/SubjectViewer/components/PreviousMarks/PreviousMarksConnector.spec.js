import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import PreviousMarksConnector from './PreviousMarksConnector'
import PreviousMarks from './PreviousMarks'
import cuid from 'cuid'

const mockStores = {
  classifications: {
    active: {
      interactionTaskAnnotations: []
    }
  },
  subjectViewer: {
    frame: 1
  }, 
  workflowSteps: {
    activeStepTasks: [],
    interactionTask: {}
  }
}

const drawingAnnotations = [{
  id: cuid(),
  task: 'T0',
  taskType: 'drawing'
}, {
  id: cuid(),
  task: 'T1',
  taskType: 'drawing'
}]

const transcriptionAnnotation = {
  id: cuid(),
  task: 'T0',
  taskType: 'transcription'
}

const mockStoresWithDrawingAnnotations = {
  classifications: {
    active: {
      interactionTaskAnnotations: drawingAnnotations
    }
  },
  subjectViewer: {
    frame: 1
  },
  workflowSteps: {
    activeStepTasks: [
      {
        taskKey: 'T1',
        shownMarks: 'USER',
        type: 'drawing'
      }
    ],
    interactionTask: {
      taskKey: 'T1',
      shownMarks: 'USER',
      type: 'drawing'
    }
  }
}

const mockStoresWithTranscriptionAnnotations = {
  classifications: {
    active: {
      interactionTaskAnnotations: [transcriptionAnnotation]
    }
  },
  subjectViewer: {
    frame: 1
  },
  workflowSteps: {
    activeStepTasks: [
      {
        taskKey: 'T1',
        type: 'question'
      }
    ],
    interactionTask: {
      taskKey: 'T0',
      shownMarks: 'USER',
      type: 'transcription'
    }
  }
}

describe('Component > PreviousMarksConnector', function () {
  let mockUseContext
  afterEach(function () {
    mockUseContext.restore()
  })

  it('should render without crashing', function () {
    mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
      return {
        classifierStore: mockStores
      }
    })
    const wrapper = shallow(<PreviousMarksConnector />)
    expect(wrapper).to.be.ok()
  })

  it('should pass along the frame index from the subject viewer store', function () {
    mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
      return {
        classifierStore: mockStores
      }
    })
    const wrapper = shallow(<PreviousMarksConnector />)
    expect(wrapper.find(PreviousMarks).props().frame).to.equal(1)
  })

  it('should pass along the scale from props', function () {
    mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
      return {
        classifierStore: mockStores
      }
    })
    const wrapper = shallow(<PreviousMarksConnector scale={2} />)
    expect(wrapper.find(PreviousMarks).props().scale).to.equal(2)
  })

  describe('when there is not an interactive task', function () {
    it('should pass along an undefined shownMarks', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStores
        }
      })
      const wrapper = shallow(<PreviousMarksConnector />)
      expect(wrapper.find(PreviousMarks).props().shownMarks).to.be.undefined()
    })
  })

  describe('when there is an interactive task', function () {
    it('should pass along the type of shownMarks from the drawing task', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithDrawingAnnotations
        }
      })
      const wrapper = shallow(<PreviousMarksConnector />)
      expect(wrapper.find(PreviousMarks).props().shownMarks).to.equal('USER')
    })

    it('should pass along the type of shownMarks from the transcription task', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithTranscriptionAnnotations
        }
      })
      const wrapper = shallow(<PreviousMarksConnector />)
      expect(wrapper.find(PreviousMarks).props().shownMarks).to.equal('USER')
    })
  })

  describe('when there are no interaction task annotations', function () {
    it('should pass along an empty annotations array', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStores
        }
      })
      const wrapper = shallow(<PreviousMarksConnector />)
      const { interactionTaskAnnotations } = wrapper.find(PreviousMarks).props()
      expect(interactionTaskAnnotations).to.be.an('array')
      expect(interactionTaskAnnotations).to.be.empty()
    })
  })

  describe('when task annotations are from drawing or transcription', function () {
    it('should pass along those drawing annotations in an array', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithDrawingAnnotations
        }
      })
      const wrapper = shallow(<PreviousMarksConnector />)
      const { interactionTaskAnnotations } = wrapper.find(PreviousMarks).props()
      expect(interactionTaskAnnotations).to.be.an('array')
      expect(interactionTaskAnnotations).to.have.lengthOf(1)
      expect(interactionTaskAnnotations[0]).to.equal(drawingAnnotations[0])
    })

    it('should only show marks from previous drawing steps', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithDrawingAnnotations
        }
      })
      const wrapper = shallow(<PreviousMarksConnector />)
      const { interactionTaskAnnotations } = wrapper.find(PreviousMarks).props()
      const taskKeys = interactionTaskAnnotations.map(annotation => annotation.task)
      expect(taskKeys).to.deep.equal(['T0'])
    })

    it('should pass along transcription annotations from previous steps', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithTranscriptionAnnotations
        }
      })
      const wrapper = shallow(<PreviousMarksConnector />)
      const { interactionTaskAnnotations } = wrapper.find(PreviousMarks).props()
      expect(interactionTaskAnnotations).to.be.an('array')
      expect(interactionTaskAnnotations).to.have.lengthOf(1)
      expect(interactionTaskAnnotations[0]).to.equal(transcriptionAnnotation)
    })
  })
})
