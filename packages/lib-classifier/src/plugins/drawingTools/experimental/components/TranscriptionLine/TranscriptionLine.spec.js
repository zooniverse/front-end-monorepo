import React from 'react'
import { mount } from 'enzyme'
import TranscriptionLine from './TranscriptionLine'
import { Provider } from 'mobx-react'
import { Grommet } from 'grommet'
import { TranscriptionLine as TranscriptionLineMarkModel } from '../../models/marks'
import { DragHandle } from '@plugins/drawingTools/components'
import zooTheme from '@zooniverse/grommet-theme'
import { Tooltip } from '@zooniverse/react-components'

describe('Components > Drawing marks > Transcription line', function () {
  let mark
  beforeEach(function () {
    mark = TranscriptionLineMarkModel.create({
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

    it('should continue to move the end point after the end point pointerdown click', function () {
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
      expect(mark.x2).to.equal(300)
      expect(mark.y2).to.equal(400)
      dragMove({}, { x: 10, y: 20 })
      expect(mark.x2).to.equal(310)
      expect(mark.y2).to.equal(420)
      expect(mark.finished).to.be.false()
    })

    it('should close on the end point pointerup click', function () {
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
      expect(mark.finished).to.be.false()
      wrapper.find('circle[cx=300]').at(0).simulate('pointerup')
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

  describe('when used by the transcription task', function () {
    it('should use the aqua drawing tool color when the state is active', function () {
      const { green } = zooTheme.global.colors.drawingTools
      const wrapper = mount(
        <svg>
          <Grommet
            theme={zooTheme}
          >
            <TranscriptionLine
              active
              mark={mark}
            />
          </Grommet>
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: true
                }
              }
            }
          }
        }
      )

      const outerGroupNode = wrapper.find('g').first()
      expect(outerGroupNode.props().color).to.equal(green)
      expect(outerGroupNode.props().fill).to.equal(green)
      expect(outerGroupNode.props().stroke).to.equal(green)
    })

    it('should use the blue drawing tool color when the state is default', function () {
      const { blue } = zooTheme.global.colors.drawingTools
      const wrapper = mount(
        <svg>
          <Grommet
            theme={zooTheme}
          >
            <TranscriptionLine
              mark={mark}
            />
          </Grommet>
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: true
                }
              }
            }
          }
        }
      )

      const outerGroupNode = wrapper.find('g').first()
      expect(outerGroupNode.props().color).to.equal(blue)
      expect(outerGroupNode.props().fill).to.equal(blue)
      expect(outerGroupNode.props().stroke).to.equal(blue)
    })

    it('should use the pink drawing tool color when the state is transcribed', function () {
      const { pink } = zooTheme.global.colors.drawingTools
      const wrapper = mount(
        <svg>
          <Grommet
            theme={zooTheme}
          >
            <TranscriptionLine
              mark={mark}
              state='transcribed'
            />
          </Grommet>
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: true
                }
              }
            }
          }
        }
      )

      const outerGroupNode = wrapper.find('g').first()
      expect(outerGroupNode.props().color).to.equal(pink)
      expect(outerGroupNode.props().fill).to.equal(pink)
      expect(outerGroupNode.props().stroke).to.equal(pink)
    })

    it('should use a gray theme color when the state is complete', function () {
      const gray = zooTheme.global.colors['light-5']
      const wrapper = mount(
        <svg>
          <Grommet
            theme={zooTheme}
          >
            <TranscriptionLine
              mark={mark}
              state='complete'
            />
          </Grommet>
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: true
                }
              }
            }
          }
        }
      )

      const outerGroupNode = wrapper.find('g').first()
      expect(outerGroupNode.props().color).to.equal(gray)
      expect(outerGroupNode.props().fill).to.equal(gray)
      expect(outerGroupNode.props().stroke).to.equal(gray)
    })

    it('should have a tooltip for the default line state', function () {
      const { blue } = zooTheme.global.colors.drawingTools
      const wrapper = mount(
        <svg>
          <Grommet
            theme={zooTheme}
          >
            <TranscriptionLine
              mark={mark}
              state='default'
            />
          </Grommet>
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: true
                }
              }
            }
          }
        }
      )

      const tooltip = wrapper.find(Tooltip)
      expect(tooltip).to.have.lengthOf(1)
      /** The translation function will simply return keys in a testing env */
      expect(tooltip.props().label).to.equal('TranscriptionLine.created')
      expect(tooltip.props().icon.props.fill).to.equal(blue)
    })

    it('should have a tooltip for the active line state', function () {
      const { green } = zooTheme.global.colors.drawingTools
      const wrapper = mount(
        <svg>
          <Grommet
            theme={zooTheme}
          >
            <TranscriptionLine
              mark={mark}
              state='active'
            />
          </Grommet>
        </svg>,
        {
          wrappingComponent: Provider,
          wrappingComponentProps: {
            classifierStore: {
              workflows: {
                active: {
                  usesTranscriptionTask: true
                }
              }
            }
          }
        }
      )

      const tooltip = wrapper.find(Tooltip)
      expect(tooltip).to.have.lengthOf(1)
      /** The translation function will simply return keys in a testing env */
      expect(tooltip.props().label).to.equal('TranscriptionLine.editing')
      expect(tooltip.props().icon.props.fill).to.equal(green)
    })
  })
})
