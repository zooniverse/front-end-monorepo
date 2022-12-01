import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'

import mockStore from '@test/mockStore'
import { ProjectFactory } from '@test/factories'
import withFeatureFlag from './'

describe('helpers > withFeatureFlag', function () {
  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Provider classifierStore={store}>
          {children}
        </Provider>
      )
    }
  }

  function TestComponent({ text }) {
    return <button>{text}</button>
  }

  describe('when a feature is enabled', function () {
    it('should render the wrapped component', function () {
      const ExperimentalFeature = withFeatureFlag(TestComponent, 'feature-flag')
      const project = ProjectFactory.build({
        experimental_tools: ['something-else', 'feature-flag']
      })
      const store = mockStore({ project })
      render(
        <ExperimentalFeature text='Hello World!' />,
        {
          wrapper: withStore(store)
        }
      )
      expect(screen.getByRole('button', { name: 'Hello World!'})).to.exist()
    })
  })
  describe('when a feature is not enabled', function () {
    it('should not render the wrapped component', function () {
      const ExperimentalFeature = withFeatureFlag(TestComponent, 'feature-flag')
      const project = ProjectFactory.build({
        experimental_tools: []
      })
      const store = mockStore({ project })
      render(
        <ExperimentalFeature text='Hello World!' />,
        {
          wrapper: withStore(store)
        }
      )
      expect(screen.queryByRole('button', { name: 'Hello World!'})).to.be.null()
    })
  })
})