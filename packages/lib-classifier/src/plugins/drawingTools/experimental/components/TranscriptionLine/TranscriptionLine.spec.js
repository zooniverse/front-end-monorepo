import React from 'react'
import { mount } from 'enzyme'
import { TranscriptionLine } from './TranscriptionLine'
import { Provider } from 'mobx-react'
import { TranscriptionLine as TranscriptionLineMark } from '../../models/marks'
import { DragHandle } from '@plugins/drawingTools/components'
import zooTheme from '@zooniverse/grommet-theme'

describe('Components > Drawing marks > Transcription line', function () {
  let mark
  beforeEach(function () {
    mark = TranscriptionLineMark.create({
      id: 'line1',
      toolType: 'transcriptionLine',
      x1: 100,
      y1: 200,
      x2: 300,
      y2: 400
    })
  })

  it('should render without crashing', function () {
    const wrapper = mount(
      <svg>
        <TranscriptionLine
          mark={mark}
          theme={zooTheme}
        />
      </svg>,
      {
        wrappingComponent: Provider,
        wrappingComponentProps: {
          classifierStore: {
            workflows: {
              active: {
                usesTranscriptionTask: false
              }
            }
          }
        }
      }
    )
    expect(wrapper).to.be.ok()
  })

  describe('when active', function () {
    it('should not be closed at first', function () {
      mount(
        <svg>
          <TranscriptionLine
            active
            mark={mark}
            theme={zooTheme}
          />
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: false
                }
              }
            }
          }
        }
      )
      expect(mark.finished).to.be.false()
    })

    it('should have a draggable start point', function () {
      const wrapper = mount(
        <svg>
          <TranscriptionLine
            active
            mark={mark}
            theme={zooTheme}
          />
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: false
                }
              }
            }
          }
        }
      )
      expect(wrapper.find(DragHandle).find('[x=100]').at(0)).to.have.lengthOf(1)
    })

    it('should have a transparent start point', function () {
      const wrapper = mount(
        <svg>
          <TranscriptionLine
            active
            mark={mark}
            theme={zooTheme}
          />
        </svg>,
        { wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: false
                }
              }
            }
          }
        }
      )
      expect(wrapper.find(DragHandle).find({ x: 100 }).at(0).prop('fill')).to.equal('transparent')
    })

    it('should move the start point on drag move', function () {
      const wrapper = mount(
        <svg>
          <TranscriptionLine
            active
            mark={mark}
            theme={zooTheme}
          />
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: false
                }
              }
            }
          }
        }
      )
      const dragMove = wrapper.find(DragHandle).find('[x=100]').at(0).prop('dragMove')
      expect(mark.x1).to.equal(100)
      expect(mark.y1).to.equal(200)
      dragMove({}, { x: 10, y: 20 })
      expect(mark.x1).to.equal(110)
      expect(mark.y1).to.equal(220)
    })

    it('should have a draggable end point', function () {
      const wrapper = mount(
        <svg>
          <TranscriptionLine
            active
            mark={mark}
            theme={zooTheme}
          />
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: false
                }
              }
            }
          }
        }
      )
      expect(wrapper.find(DragHandle).find('[x=300]').at(0)).to.have.lengthOf(1)
    })

    it('should move the end point on drag move', function () {
      const wrapper = mount(
        <svg>
          <TranscriptionLine
            active
            mark={mark}
            theme={zooTheme}
          />
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: false
                }
              }
            }
          }
        }
      )
      const dragMove = wrapper.find(DragHandle).find('[x=300]').at(0).prop('dragMove')
      expect(mark.x2).to.equal(300)
      expect(mark.y2).to.equal(400)
      dragMove({}, { x: 10, y: 20 })
      expect(mark.x2).to.equal(310)
      expect(mark.y2).to.equal(420)
    })

    it('should close when the end point is clicked', function () {
      const wrapper = mount(
        <svg>
          <TranscriptionLine
            active
            mark={mark}
            theme={zooTheme}
          />
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: false
                }
              }
            }
          }
        }
      )
      const dragMove = wrapper.find(DragHandle).find('[x=300]').at(0).prop('dragMove')

      wrapper.find('circle[cx=300]').at(0).simulate('pointerdown')
      expect(mark.finished).to.be.true()
      dragMove({}, { x: 10, y: 20 })
      expect(mark.finished).to.be.true()

    })
  })

  describe('when used by the drawing task', function () {
    it('should use the color set for the tool passed as a prop', function () {
      const tool = {
        color: zooTheme.global.colors['drawing-orange']
      }
      const wrapper = mount(
        <svg>
          <TranscriptionLine
            active
            color={tool.color}
            mark={mark}
            theme={zooTheme}
          />
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: false
                }
              }
            }
          }
        }
      )

      const outerGroupNode = wrapper.find('g').first()
      expect(outerGroupNode.props().color).to.equal(tool.color)
      expect(outerGroupNode.props().fill).to.equal(tool.color)
      expect(outerGroupNode.props().stroke).to.equal(tool.color)
    })
  })
})
