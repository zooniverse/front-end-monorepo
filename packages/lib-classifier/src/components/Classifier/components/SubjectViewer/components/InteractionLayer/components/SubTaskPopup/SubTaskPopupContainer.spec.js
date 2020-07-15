import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import SubTaskPopupContainer from './SubTaskPopupContainer'
import SubTaskPopup from './SubTaskPopup'

function setupStores (type, activeMark) {
  return {
    classifierStore: {
      workflowSteps: {
        activeStepTasks: [
          {
            activeMark: activeMark || undefined,
            type
          }
        ]
      }
    }
  }
}

describe('Component > SubTaskPopupContainer', function () {
  let mockUseContext, wrapper
  afterEach(function () {
    mockUseContext.restore()
  })

  it('should render without crashing', function () {
    mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('drawing'))
    wrapper = shallow(<SubTaskPopupContainer />)
    expect(wrapper).to.be.ok()
  })

  describe('when the task is not drawing or transcription', function () {
    it('should render nothing', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('single'))
      wrapper = shallow(<SubTaskPopupContainer />)
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('when the task is drawing', function () {
    it('should render nothing when an active mark isn\'t defined', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('drawing'))
      wrapper = shallow(<SubTaskPopupContainer />)
      expect(wrapper.html()).to.be.null()
    })

    it('should render nothing when an active mark subTaskVisibility is false', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('drawing', { id: 'mark1', subTaskVisibility: false }))
      wrapper = shallow(<SubTaskPopupContainer />)
      expect(wrapper.html()).to.be.null()
    })

    it('should render a SubTaskPopup', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('drawing', { id: 'mark1', subTaskVisibility: true }))
      wrapper = shallow(<SubTaskPopupContainer />)
      expect(wrapper.find(SubTaskPopup)).to.have.lengthOf(1)
    })

    it('should pass the activeMark to the SubTaskPopup', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('drawing', { id: 'mark1', subTaskVisibility: true }))
      expect(wrapper.find(SubTaskPopup).props().activeMark).to.deep.equal({ id: 'mark1', subTaskVisibility: true })
    })
  })

  describe('when the task is transcription', function () {
    it('should render nothing when an active mark isn\'t defined', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('transcription'))
      wrapper = shallow(<SubTaskPopupContainer />)
      expect(wrapper.html()).to.be.null()
    })

    it('should render nothing when an active mark subTaskVisibility is false', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('transcription', { id: 'mark2', subTaskVisibility: false }))
      wrapper = shallow(<SubTaskPopupContainer />)
      expect(wrapper.html()).to.be.null()
    })

    it('should render a SubTaskPopup', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('transcription', { id: 'mark2', subTaskVisibility: true }))
      wrapper = shallow(<SubTaskPopupContainer />)
      expect(wrapper.find(SubTaskPopup)).to.have.lengthOf(1)
    })

    it('should pass the activeMark to the SubTaskPopup', function () {
      mockUseContext = sinon.stub(React, 'useContext').callsFake(() => setupStores('transcription', { id: 'mark2', subTaskVisibility: true }))
      wrapper = shallow(<SubTaskPopupContainer />)
      expect(wrapper.find(SubTaskPopup).props().activeMark).to.deep.equal({ id: 'mark2', subTaskVisibility: true })
    })
  })
})