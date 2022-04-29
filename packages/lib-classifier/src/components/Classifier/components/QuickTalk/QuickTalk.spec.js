import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { QuickTalk } from './QuickTalk'

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

describe.only('Component > QuickTalk', function () {
  describe('when collapsed', function () {
    beforeEach(function () {
      render(
        <QuickTalk
          subject={subject}
          comments={comments}
          authors={authors}
          authorRoles={authorRoles}
          showBadge={false}
        />
      )
    })

    it('should render without crashing', function () {
      expect(screen.queryByTestId('quicktalk-button')).to.exist()
      expect(screen.queryByTestId('quicktalk-panel')).to.not.exist()
    })

    it('should expand when clicked', function () {
      fireEvent.click(screen.queryByTestId('quicktalk-button'))

      expect(screen.queryByTestId('quicktalk-button')).to.not.exist()
      expect(screen.queryByTestId('quicktalk-panel')).to.exist()
    })
  })

  describe('when expanded', function () {
    beforeEach(function () {
      render(
        <QuickTalk
          subject={subject}
          comments={comments}
          authors={authors}
          authorRoles={authorRoles}
          expand={true}
          showBadge={false}
        />
      )
    })

    it('should render without crashing', function () {
      expect(screen.queryByTestId('quicktalk-button')).to.not.exist()
      expect(screen.queryByTestId('quicktalk-panel')).to.exist()
    })

    it('should have the correct number of comments', function () {
      expect(screen.queryAllByRole('listitem')).to.have.length(3)
    })

    it('should collapse when the close button is clicked', function () {
      fireEvent.click(screen.queryByRole('button'))

      expect(screen.queryByTestId('quicktalk-button')).to.exist()
      expect(screen.queryByTestId('quicktalk-panel')).to.not.exist()
    })
  })
})
