import { expect } from 'chai'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'
import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import SingleTextViewerConnector from './SingleTextViewerConnector'

describe('SingleTextViewerConnector', function () {
  const subjectSnapshot = SubjectFactory.build({
    content: 'This is test subject content',
    contentLoadingState: asyncStates.success,
    locations: [
      { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
    ]
  })

  const store = mockStore({
    subject: subjectSnapshot
  })

  function withStore (store) {
    return function Wrapper ({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  it('should render without crashing', function () {
    render(
      <SingleTextViewerConnector />,
      {
        wrapper: withStore(store)
      }
    )
    expect(screen).to.be.ok()
    expect(screen.getByText('This is test subject content')).to.exist()
  })
})
