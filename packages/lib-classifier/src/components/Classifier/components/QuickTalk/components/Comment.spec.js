import React from 'react'
import { render, screen } from '@testing-library/react'

import Comment from './Comment'

const comment = {
  id: '200001',
  body: 'This is the first comment',
  is_deleted: false,
  user_id: '300001',
  user_login: 'zootester',
}

const author = {
  id: '300001',
  avatar_src: null,
  credited_name: 'zootester',
  display_name: 'Zooniverse Tester',
  login: 'zootester',
}

const authorRoles = [
  { name: 'admin', section: 'project-1234' }
]

describe('Component > QuickTalk > Comment', function () {
  beforeEach(function () {
    render(
      <ul>
        <Comment
          author={author}
          comment={comment}
          roles={authorRoles}
        />
      </ul>
    )
  })

  it('should render the comment', function () {
    expect(screen.getByText('This is the first comment')).to.exist()
  })

  it('should render the author details', function () {
    expect(screen.getByText('Zooniverse Tester')).to.exist()
    expect(screen.getByText(/\(@\s*zootester\s*\)/)).to.exist()

    expect(screen.getByAltText('QuickTalk.aria.userAvatar')).to.exist()
    expect(screen.getByAltText('QuickTalk.aria.userAvatar')).to.have.property('src', 'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png')

  })

  it('should render the correct roles', function () {
    expect(screen.getByText(/\[\s*Researcher\s*\]/)).to.exist()
  })
})
