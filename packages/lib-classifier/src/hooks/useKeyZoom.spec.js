import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'chai'
import sinon from 'sinon'
import { Provider } from 'mobx-react'

import { useKeyZoom } from '@hooks'
import SubjectViewerStore from '@store/SubjectViewerStore'

describe('Hooks > useKeyZoom', function () {
  describe('on key down', function () {
    const onPan = sinon.stub()
    const onZoom = sinon.stub()

    const bindings = [
      {
        key: '+',
        name: 'zoomIn',
        handler: onZoom.withArgs('zoomin', 1)
      },
      {
        key: '=',
        name: 'zoomIn',
        handler: onZoom.withArgs('zoomin', 1)
      },
      {
        key: '-',
        name: 'zoomOut',
        handler: onZoom.withArgs('zoomout', -1)
      },
      {
        key: '_',
        name: 'zoomOut',
        handler: onZoom.withArgs('zoomout', -1)
      },
      {
        key: 'ArrowRight',
        name: 'pan right',
        handler: onPan.withArgs(1,0)
      },
      {
        key: 'ArrowLeft',
        name: 'pan left',
        handler: onPan.withArgs(-1,0)
      },
      {
        key: 'ArrowUp',
        name: 'pan up',
        handler: onPan.withArgs(0,-1)
      },
      {
        key: 'ArrowDown',
        name: 'pan down',
        handler: onPan.withArgs(0,1)
      }
    ]

    function testAllowedTag(tagName, StubComponent) {
      describe(`when the event target is ${tagName}`, function () {
        let wrappedComponent

        function WithZoom(props) {
          const { onKeyZoom } = useKeyZoom()
          return (
            <StubComponent
              onKeyDown={onKeyZoom}
              {...props}
            />
          )
        }

        beforeEach(function () {
          const subjectViewer = SubjectViewerStore.create({})
          const classifierStore = {
            subjectViewer
          }
          subjectViewer.setOnPan(onPan)
          subjectViewer.setOnZoom(onZoom)
          render(
            <Provider classifierStore={classifierStore}>
              <WithZoom />
            </Provider>
          )
          wrappedComponent = document.getElementById('testStub')
        })

        afterEach(function () {
          onPan.resetHistory()
          onZoom.resetHistory()
        })

        bindings.forEach(function ({ key, name, handler }) {
          it(`should call ${name} for ${key}`, async function () {
            const user = userEvent.setup()
            wrappedComponent.focus()
            await user.keyboard(`{${key}}`)
            expect(handler).to.have.been.calledOnce()
          })
        })
      })
    }

    describe('for allowed tags', function () {
      testAllowedTag('SVG', props => <svg id='testStub' tabIndex='0' {...props}><text>Hello</text></svg>)
      testAllowedTag('BUTTON', props => <button id='testStub' {...props}>Hello</button>)
      testAllowedTag('G', props => <svg><g id='testStub' tabIndex='0'{...props}><text>Hello</text></g></svg>)
      testAllowedTag('RECT', props => <svg><rect id='testStub' tabIndex='0'{...props}><text>Hello</text></rect></svg>)
    })

    describe('when the event target is something else', function () {
      let wrappedComponent

      beforeEach(function () {
        function WithZoom(props) {
          const { onKeyZoom } = useKeyZoom()
          return (
            <p
              id='testStub'
              tabIndex='0'
              onKeyDown={onKeyZoom}
              {...props}
            >
              Hello
            </p>
          )
        }
        const subjectViewer = SubjectViewerStore.create({})
        const classifierStore = {
          subjectViewer
        }
        subjectViewer.setOnPan(onPan)
        subjectViewer.setOnZoom(onZoom)
        render(
          <Provider classifierStore={classifierStore}>
            <WithZoom />
          </Provider>
        )
        wrappedComponent = document.getElementById('testStub')
      })

      afterEach(function () {
        onPan.resetHistory()
        onZoom.resetHistory()
      })

      bindings.forEach(function ({ key, name, handler }) {
        it(`should not call ${name} for ${key}`, async function () {
          const user = userEvent.setup()
          wrappedComponent.focus()
          await user.keyboard(`{${key}}`)
          expect(handler).to.not.have.been.called()
        })
      })
    })

    it('should not trap other keys', async function () {
      function WithZoom(props) {
        const { onKeyZoom } = useKeyZoom()
        return (
          <button
            id='testStub'
            tabIndex='0'
            onKeyDown={onKeyZoom}
            {...props}
          >
            Hello
          </button>
        )
      }
      const subjectViewer = SubjectViewerStore.create({})
      const classifierStore = {
        subjectViewer
      }
      subjectViewer.setOnPan(onPan)
      subjectViewer.setOnZoom(onZoom)
      render(
        <Provider classifierStore={classifierStore}>
          <WithZoom />
        </Provider>
      )
      const wrappedComponent = document.getElementById('testStub')
      const user = userEvent.setup()
      wrappedComponent.focus()
      await user.keyboard('{Tab}')
      expect(onPan).to.have.not.been.called()
      expect(onZoom).to.have.not.been.called()
    })

    describe('with custom key mappings', function () {
      let wrappedComponent
      const customMap = sinon.stub()

      const customKeyMappings = {
        ' ': customMap
      }

      function WithCustomMap(props) {
        const { onKeyZoom } = useKeyZoom({ customKeyMappings })
        return (
          <button
            id='testStub'
            tabIndex='0'
            onKeyDown={onKeyZoom}
            {...props}
          >
            Hello
          </button>
        )
      }

      beforeEach(function () {
        const subjectViewer = SubjectViewerStore.create({})
        const classifierStore = {
          subjectViewer
        }
        subjectViewer.setOnPan(onPan)
        subjectViewer.setOnZoom(onZoom)
        render(
          <Provider classifierStore={classifierStore}>
            <WithCustomMap />
          </Provider>
        )
        wrappedComponent = document.getElementById('testStub')
      })

      afterEach(function () {
        onPan.resetHistory()
        onZoom.resetHistory()
        customMap.resetHistory()
      })

      it('should call custom map', async function () {
        const user = userEvent.setup()
        wrappedComponent.focus()
        await user.keyboard(`{ }`)
        expect(customMap).to.have.been.calledOnce()
      })

      it('should call useKeyZoom zoom mappings', async function () {
        const user = userEvent.setup()
        wrappedComponent.focus()
        await user.keyboard(`{=}`)
        expect(onZoom).to.have.been.calledOnce()
      })

      it('should call useKeyZoom pan mappings', async function () {
        const user = userEvent.setup()
        wrappedComponent.focus()
        await user.keyboard(`{ArrowRight}`)
        expect(onPan).to.have.been.calledOnce()
      })
    })
  })
})
