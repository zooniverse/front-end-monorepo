import React from 'react'
import { render, screen } from '@testing-library/react'

import UserAvatar from './UserAvatar'

const authorOne = {
  id: '300001',
  avatar_src: null,
  credited_name: 'zootester',
  display_name: 'Zooniverse Tester',
  login: 'zootester',
}

const authorTwo = {
  id: '300002',
  avatar_src: 'https://example.zooniverse.org/avatar/randomDude.png',
  credited_name: 'randomdude',
  display_name: 'Random Dude',
  login: 'randomdude',
}

describe('Component > QuickTalk > UserAvatar', function () {
  describe('when a user has no specific avatar', function () {
    beforeEach(function () {
      render(
        <UserAvatar
          src={authorOne.avatar_src}
          displayName={authorOne.display_name}
        />
      )
    })

    it('should render the default avatar', function () {
      expect(screen.getByAltText('Avatar for Zooniverse Tester')).to.exist()
      expect(screen.getByAltText('Avatar for Zooniverse Tester')).to.have.property('src', 'https://static.zooniverse.org/www.zooniverse.org/assets/simple-avatar.png')
    })
  })

  describe('when a user has a specific avatar', function () {
    beforeEach(function () {
      render(
        <UserAvatar
          src={authorTwo.avatar_src}
          displayName={authorTwo.display_name}
        />
      )
    })

    it('should render the default avatar', function () {
      expect(screen.getByAltText('Avatar for Random Dude')).to.exist()
      expect(screen.getByAltText('Avatar for Random Dude')).to.have.property('src', 'https://example.zooniverse.org/avatar/randomDude.png')
    })
  })
})
