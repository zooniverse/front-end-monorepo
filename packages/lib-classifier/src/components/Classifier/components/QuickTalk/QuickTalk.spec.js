import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QuickTalk } from './QuickTalk'
import { Tabs } from '@zooniverse/react-components'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

/*
Workaround: prevent "infinite rendering Tabs" in Grommet 2.25
If a Grommet <Tab> is defined in a separate function than the parent Grommet
<Tabs>, it may cause an "infinite rendering loop" with the error message:
"Warning: Maximum update depth exceeded". One solution is to wrap the child
<Tab> in a React.memo.
*/
const QuickTalkForTesting = React.memo(QuickTalk)

const subject = {
  id: '100001',
  talkURL: 'https://www.zooniverse.org/projects/zootester/test-project/talk/subjects/100001',
}

const comments = [
  {
    id: '200001',
    body: 'This is the first comment',
    is_deleted: false,
    user_id: '300001',
    user_login: 'zootester',
  },
  {
    id: '200002',
    body: 'This is the second comment',
    is_deleted: false,
    user_id: '300001',
    user_login: 'zootester',
  },
  {
    id: '200003',
    body: 'This is the third comment',
    is_deleted: false,
    user_id: '300002',
    user_login: 'randomdude',
  },
]

const authors = {
  '300001': {
    id: '300001',
    avatar_src: null,
    credited_name: 'zootester',
    display_name: 'Zooniverse Tester',
    login: 'zootester',
  },
  '300002': {
    avatar_src: null,
    login: 'randomdude',
    credited_name: 'randomdude',
    display_name: 'Random Dude',
    login: 'randomdude',
  },
}

const authorRoles = {
  '300001': [{ name: 'admin', section: 'project-1234' }],
  '300002': [],
}

const loggedInUserId = '300001'

describe('Component > QuickTalk', function () {
  describe('when user is not logged in', function () {
    beforeEach(function () {
      render(
        <Grommet theme={zooTheme}>
          <Tabs>
            <QuickTalkForTesting
              subject={subject}
              comments={comments}
              authors={authors}
              authorRoles={authorRoles}
              userId={undefined}
            />
          </Tabs>
        </Grommet>
      )
    })

    it('should render without crashing', function () {
      expect(screen.queryByRole('tab')).to.have.text('QuickTalk.tabTitle')
      expect(screen.queryByRole('link')).to.have.text('QuickTalk.goToTalk')
    })

    it('should have the correct number of comments', function () {
      expect(screen.queryAllByRole('listitem')).to.have.length(3)
    })

    it('should prompt users to login', function () {
      expect(screen.queryByText('QuickTalk.loginToPost')).to.exist()
    })
  })

  describe('when user is logged in', function () {
    beforeEach(function () {
      render(
        <Grommet theme={zooTheme}>
          <Tabs>
            <QuickTalkForTesting
              subject={subject}
              comments={comments}
              authors={authors}
              authorRoles={authorRoles}
              userId={loggedInUserId}
            />
          </Tabs>
        </Grommet>
      )
    })

    it('should prompt users to login', function () {
      expect(screen.queryByRole('button')).to.have.text('Post')
    })
  })
})
