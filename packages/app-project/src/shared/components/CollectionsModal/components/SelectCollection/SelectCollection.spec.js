import { render, screen } from '@testing-library/react'
import sinon from 'sinon'
import userEvent from '@testing-library/user-event'

import { mockCollections } from '../../CollectionsModal.stories.js'
import SelectCollection from './SelectCollection.js'

describe('Component > SelectCollection', function () {
  const onSearch = sinon.stub()

  beforeEach(function () {
    render(
      <SelectCollection
        collections={mockCollections}
        onSearch={onSearch}
        userID='123'
      />
    )
  })

  it('should be empty by default', function () {
    const selectInput = document.querySelector('input')
    expect(selectInput.value).to.equal('')
  })

  it('should contain an Add button', function () {
    expect(screen.getByText('CollectionsModal.SelectCollection.addButton')).exists()
  })

  it('should call the onSearch callback', async function () {
    const baseQuery = {
      favorite: false,
      current_user_roles: 'owner,collaborator,contributor',
      search: undefined
    }

    const textQuery = {
      favorite: false,
      current_user_roles: 'owner,collaborator,contributor',
      search: 'coll'
    }

    const user = userEvent.setup({ delay: null })
    const selectButton = document.querySelector('#collectionsSearch')

    // Click the drop button in order to show list of options
    await user.click(selectButton)
    await screen.findByRole('listbox')

    // input is the text search box
    const dropInput = document.querySelector('#collectionsSearch__drop input')
    await user.type(dropInput, 'coll')

    expect(onSearch).to.have.callCount(4)
    expect(onSearch.withArgs(baseQuery)).to.have.been.calledThrice()
    expect(onSearch.withArgs(textQuery)).to.have.been.calledOnce() // only query panoptes when text search is >4 characters
  })
})
