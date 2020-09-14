import React from 'react'
import { Box } from 'grommet'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import cuid from 'cuid'
import SubTaskPopup from './SubTaskPopup'
import SaveButton from './components/SaveButton'
import { CloseButton, MovableModal } from '@zooniverse/react-components'
import * as Tools from '@plugins/drawingTools/models/tools'

describe('SubTaskPopup', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SubTaskPopup />)
    expect(wrapper).to.be.ok()
  })

  describe('title bar', function () {
    let modal
    before(function () {
      const activeMark = { subTaskVisibility: true }
      modal = shallow(<SubTaskPopup activeMark={activeMark} />).find(MovableModal)
    })

    it('should have a transparent background', function () {
      expect(modal.prop('headingBackground')).to.equal('transparent')
    })

    it('should use the default text colour', function () {
      expect(modal.prop('titleColor')).to.equal('')
    })
  })

  Object.keys(Tools).forEach((toolKey) => {
    // We don't need to test the generic Tool model since the others are a composite with it.
    if (toolKey !== 'Tool') {
      const type = toolKey.split('Tool')[0]
      const camelCaseType = type.charAt(0).toLowerCase() + type.slice(1)
      const tool = Tools[toolKey].create({
        color: 'red',
        type: camelCaseType,
        details: [
          {
            instruction: 'Name your favourite fruit.',
            taskKey: 'T0.0',
            type: 'text'
          },
          {
            instruction: 'Name your favourite colour.',
            taskKey: 'T0.1',
            type: 'text'
          },
          {
            instruction: 'Name your favourite animal.',
            taskKey: 'T0.2',
            type: 'text'
          }
        ]
      })
      const mark = tool.createMark({
        id: cuid(),
        toolType: tool.type
      })

      describe(`with ${tool.type} drawing mark`, function () {
        let setSubTaskVisibilitySpy
        before(function () {
          setSubTaskVisibilitySpy = sinon.spy(mark, 'setSubTaskVisibility')
        })

        afterEach(function () {
          setSubTaskVisibilitySpy.resetHistory()
        })

        it('should render a container when given an active drawing mark and subtask visibility is true', function () {
          mark.setSubTaskVisibility(true)
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
            />
          )
          expect(wrapper.find(Box).first()).to.have.lengthOf(1)
        })

        it('should render nothing when subtask visibility isn\'t true', function () {
          mark.setSubTaskVisibility(false)
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
            />
          )
          expect(wrapper.html()).to.be.null()
        })

        it('should render the correct number of subtasks, according to the active drawing mark provided', function () {
          mark.setSubTaskVisibility(true)
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
            />
          )
          expect(wrapper.find('.subtaskpopup-element-that-ignores-drag-actions')).to.have.lengthOf(3)
        })

        describe('on close', function () {
          it('should call setSubTaskVisibility on clicking the save button', function () {
            mark.setSubTaskVisibility(true)
            setSubTaskVisibilitySpy.resetHistory()
            const wrapper = shallow(
              <SubTaskPopup
                activeMark={mark}
              />
            )
            wrapper.find(SaveButton).simulate('click')
            expect(setSubTaskVisibilitySpy).to.have.been.calledOnce()
          })

          xit('should call setSubTaskVisibility on clicking the close button', function () {
            // had to switch to mount to do this integration test
            // Make this test not pending anymore once we can upgrade jsdom to >16.2.2
            // see: https://github.com/jsdom/jsdom/issues/2586
            // test passes, but throws jsdom error
            // TypeError: activeElement.detachEvent is not a function
            // which clutters the test running output
            // new release should be soon
            mark.setSubTaskVisibility(true)
            setSubTaskVisibilitySpy.resetHistory()
            const wrapper = mount(
              <SubTaskPopup
                activeMark={mark}
              />
            )
            wrapper.find(CloseButton).simulate('click')
            expect(setSubTaskVisibilitySpy).to.have.been.calledOnce()
          })
        })
      })
    }
  })
})
