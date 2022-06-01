import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QuickTalkContainer } from './QuickTalkContainer'

const subject = {
  id: '100001',
  talkURL: 'https://www.zooniverse.org/projects/zootester/test-project/talk/subjects/100001',
}

const authClient = {}
const quickTalkButton_target = { name: 'QuickTalk.aria.openButton' }

describe('Component > QuickTalkContainer', function () {
  describe('when collapsed', function () {
    beforeEach(function () {
      render(
        <QuickTalkContainer
          authClient={authClient}
          enabled={true}
          subject={subject}
        />
      )
    })

    it('should render without crashing', function () {
      expect(screen.queryByRole('button', quickTalkButton_target)).to.exist()
    })
  })
})
