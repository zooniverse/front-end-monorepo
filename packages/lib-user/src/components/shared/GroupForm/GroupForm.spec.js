import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Create, Manage } from './GroupForm.stories'

describe('components > shared > GroupForm', function() {
  describe('without a provided group (create mode)', function() {

    const user = userEvent.setup()
    const CreateStory = composeStory(Create, Meta)
  
    it('should collect group display name', function() {
      render(<CreateStory />)
  
      const displayName = screen.getByRole('textbox', { name: 'Group Name' })
      expect(displayName).to.be.ok()
    })
  
    it('should have radio buttons for public or private visibility', function() {
      render(<CreateStory />)
  
      const privateRadio = screen.getByRole('radio', { name: 'Private - only members can view this group' })
      const publicRadio = screen.getByRole('radio', { name: 'Public - you can share this group with anyone' })
      expect(privateRadio).to.be.ok()
      expect(publicRadio).to.be.ok()
    })
  
    it('should default to private visibility', function() {
      render(<CreateStory />)
  
      const privateRadio = screen.getByRole('radio', { name: 'Private - only members can view this group' })
      expect(privateRadio.checked).to.be.true()
    })
  
    it('should have a select for stats visibility', function() {
      render(<CreateStory />)
  
      // the Grommet Select component renders as a button with a textbox. The statsVisibility input uses the Grommet Select, therefore we need to find the textbox role. The textbox name includes the value of the select, which by default is 'private_agg_only'.
      const statsVisibility = screen.getByRole('textbox', { name: 'Stats Visibility, private_agg_only' })
      expect(statsVisibility).to.be.ok()
    })
  
    describe('with private visibility', function() {
      it('should show private stats visibility options', async function() {
        render(<CreateStory />)
  
        // by default, the visibility is private
        const privateRadio = screen.getByRole('radio', { name: 'Private - only members can view this group' })
        expect(privateRadio.checked).to.be.true()
  
        const statsVisibility = screen.getByRole('textbox', { name: 'Stats Visibility, private_agg_only' })
        await user.click(statsVisibility)
  
        const options = screen.getAllByRole('option')
        
        // the private visibility options are 'private_agg_only' and 'private_show_agg_and_ind'
        expect(options.length).to.equal(2)
      })
    })
  
    describe('with public visibility', function() {
      it('should show public stats visibility options', async function() {
        render(<CreateStory />)
  
        const publicRadio = screen.getByRole('radio', { name: 'Public - you can share this group with anyone' })
        await user.click(publicRadio)
        expect(publicRadio.checked).to.be.true()
  
        const statsVisibility = screen.getByRole('textbox', { name: 'Stats Visibility, public_agg_only' })
        await user.click(statsVisibility)
  
        const options = screen.getAllByRole('option')
        
        // the public visibility options are 'public_agg_only', 'public_show_agg_and_ind', and 'public_show_all'
        expect(options.length).to.equal(3)
      })
    })
  
    describe('without a display name', function() {
      it('should show display name is required', async function() {
        render(<CreateStory />)
  
        const submit = screen.getByRole('button', { name: 'Create new group' })
        await user.click(submit)
  
        const error = screen.getByText('required')
        expect(error).to.be.ok()
      })
    })
  
    describe('with an invalid display name', function() {
      it('should show display name is invalid', async function() {
        render(<CreateStory />)
  
        const displayName = screen.getByRole('textbox', { name: 'Group Name' })
        await user.type(displayName, 'abc')
        const submit = screen.getByRole('button', { name: 'Create new group' })
        await user.click(submit)
  
        const error = screen.getByText('must be > 3 characters')
        expect(error).to.be.ok()
      })
    })
  })

  describe('with a provided group (manage mode)', function() {
    const ManageStory = composeStory(Manage, Meta)

    it('should show the deactivate button', function() {
      render(<ManageStory />)

      const deactivateButton = screen.getByRole('button', { name: 'Deactivate Group' })
      expect(deactivateButton).to.be.ok()
    })

    it('should show the group display name', function() {
      render(<ManageStory />)

      const displayName = screen.getByRole('textbox', { name: 'Group Name' })
      expect(displayName.value).to.equal('Test Group Name')
    })

    it('should show the group visibility', function() {
      render(<ManageStory />)

      const publicRadio = screen.getByRole('radio', { name: 'Public - you can share this group with anyone' })
      expect(publicRadio.checked).to.be.true()
    })

    it('should show the group stats visibility', function() {
      render(<ManageStory />)

      const statsVisibility = screen.getByRole('textbox', { name: 'Stats Visibility, public_show_all' })
      expect(statsVisibility).to.be.ok()
    })
  })
})
