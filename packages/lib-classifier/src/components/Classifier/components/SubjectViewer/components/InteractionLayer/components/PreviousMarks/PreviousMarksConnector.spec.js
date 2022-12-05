import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react';
import PreviousMarksConnector from './PreviousMarksConnector'
import PreviousMarks from './PreviousMarks'
import cuid from 'cuid'

const mockStores = {
  classifications: {
    active: {
      previousInteractionTaskAnnotations: () => []
    }
  },
  subjectViewer: {
    frame: 1
  }, 
  workflowSteps: {
    activeInteractionTask: {},
    interactionTask: {}
  }
}

const drawingAnnotation = {
  id: cuid(),
  task: 'T0',
  taskType: 'drawing'
}

const transcriptionAnnotation = {
  id: cuid(),
  task: 'T0',
  taskType: 'transcription'
}

const mockStoresWithDrawingAnnotations = {
  classifications: {
    active: {
      previousInteractionTaskAnnotations: () => [drawingAnnotation]
    }
  },
  subjectViewer: {
    frame: 1
  },
  workflowSteps: {
    activeInteractionTask: {
      taskKey: 'T0',
      type: 'drawing'
    },
    interactionTask: {
      shownMarks: 'ALL',
      type: 'drawing'
    }
  }
}

const mockStoresWithTranscriptionAnnotations = {
  classifications: {
    active: {
      previousInteractionTaskAnnotations: () => [transcriptionAnnotation]
    }
  },
  subjectViewer: {
    frame: 1
  },
  workflowSteps: {
    activeInteractionTask: {
      taskKey: 'T0',
      type: 'transcription'
    },
    interactionTask: {
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
      expect(wrapper.find(PreviousMarks).props().shownMarks).to.equal('ALL')
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
      const { previousAnnotations } = wrapper.find(PreviousMarks).props()
      expect(previousAnnotations).to.be.an('array')
      expect(previousAnnotations).to.be.empty()
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
      const { previousAnnotations } = wrapper.find(PreviousMarks).props()
      expect(previousAnnotations).to.be.an('array')
      expect(previousAnnotations).to.have.lengthOf(1)
      expect(previousAnnotations[0]).to.equal(drawingAnnotation)
    })

    it('should pass along those transcription annotations in an array', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => {
        return {
          classifierStore: mockStoresWithTranscriptionAnnotations
        }
      })
      const wrapper = shallow(<PreviousMarksConnector />)
      const { previousAnnotations } = wrapper.find(PreviousMarks).props()
      expect(previousAnnotations).to.be.an('array')
      expect(previousAnnotations).to.have.lengthOf(1)
      expect(previousAnnotations[0]).to.equal(transcriptionAnnotation)
    })
  })
})
