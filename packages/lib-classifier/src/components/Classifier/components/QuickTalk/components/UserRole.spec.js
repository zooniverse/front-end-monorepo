import { render, screen } from '@testing-library/react'

import UserRole from './UserRole'

const roleForZooniverseAdmin = { name: 'admin', section: 'zooniverse' }
const roleForZooniverseTeam = { name: 'team', section: 'zooniverse' }
const roleForProjectOwner = { name: 'owner', section: 'project-1234' }
const roleForProjectScientist = { name: 'scientist', section: 'project-1234' }
const roleForMiscUser = { name: 'video gamer', section: 'project-1234' }

describe('Component > QuickTalk > UserAvatar', function () {
  describe('when given a specifc role', function () {
    it('should render correct text for a Zooniverse Admin', function () {
      render(<UserRole role={roleForZooniverseAdmin} />)
      expect(screen.getByText(/\[\s*Zooniverse Team\s*\]/)).to.exist()
    })

    it('should render correct text for a Zooniverse Team member', function () {
      render(<UserRole role={roleForZooniverseTeam} />)
      expect(screen.getByText(/\[\s*Zooniverse Team\s*\]/)).to.exist()
    })

    it('should render correct text for a Project owner', function () {
      render(<UserRole role={roleForProjectOwner} />)
      expect(screen.getByText(/\[\s*Researcher\s*\]/)).to.exist()
    })

    it('should render correct text for a Project scientist', function () {
      render(<UserRole role={roleForProjectScientist} />)
      expect(screen.getByText(/\[\s*Researcher\s*\]/)).to.exist()
    })

    it('should render correct text for a Project scientist', function () {
      render(<UserRole role={roleForMiscUser} />)
      expect(screen.getByText(/\[\s*video gamer\s*\]/)).to.exist()
    })
  })
})
