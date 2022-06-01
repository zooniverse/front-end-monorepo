import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

const quickTalkButton_target = { name: 'QuickTalk.aria.openButton' }
const quickTalkCloseButton_target = { name: 'QuickTalk.aria.closeButton' }
const quickTalkPanel_target = { name: 'QuickTalk.aria.mainPanel' }

describe('Component > QuickTalk', function () {
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
      expect(screen.queryByRole('button', quickTalkButton_target)).to.exist()
      expect(screen.queryByRole('dialog', quickTalkPanel_target)).to.not.exist()
    })

    it('should expand when clicked', async function () {
      const user = userEvent.setup({ delay: null })

      expect(screen.queryByRole('button', quickTalkButton_target)).to.exist()
      await user.click(screen.queryByRole('button', quickTalkButton_target))

      expect(screen.queryByRole('button', quickTalkButton_target)).to.not.exist()
      expect(screen.queryByRole('dialog', quickTalkPanel_target)).to.exist()
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
      expect(screen.queryByRole('button', quickTalkButton_target)).to.not.exist()
      expect(screen.queryByRole('dialog', quickTalkPanel_target)).to.exist()
    })

    it('should have the correct number of comments', function () {
      expect(screen.queryAllByRole('listitem')).to.have.length(3)
    })

    it('should collapse when the close button is clicked', async function () {
      const user = userEvent.setup({ delay: null })
      await user.click(screen.queryByRole('button', quickTalkCloseButton_target))

      expect(screen.queryByRole('button', quickTalkButton_target)).to.exist()
      expect(screen.queryByRole('dialog', quickTalkPanel_target)).to.not.exist()
    })
  })
})
