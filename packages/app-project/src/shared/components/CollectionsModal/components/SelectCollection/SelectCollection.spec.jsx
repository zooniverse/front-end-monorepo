import { render, screen } from '@testing-library/react'
import sinon from 'sinon'
import userEvent from '@testing-library/user-event'

import { mockCollections } from '../../CollectionsModal.stories'
import SelectCollection from './SelectCollection'

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

    // Click the drop button in order to show options and search box
    await user.click(selectButton)
    await screen.findByRole('listbox')

    const searchBar = document.querySelector('input[type="search"]')
    await user.type(searchBar, 'coll') // causes [TypeError: activeElement.attachEvent is not a function]

    expect(onSearch).to.have.callCount(4)
    expect(onSearch.withArgs(baseQuery)).to.have.been.calledThrice()
    expect(onSearch.withArgs(textQuery)).to.have.been.calledOnce() // only query panoptes when text search is >4 characters
  })
})
