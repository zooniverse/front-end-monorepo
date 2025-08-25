import { render, screen } from '@testing-library/react'
import sinon from 'sinon'
import userEvent from '@testing-library/user-event'

import { mockCollections } from '../../CollectionsModal.stories'
import SelectCollection from './SelectCollection'

describe('Component > SelectCollection', function () {
  const onSearch = sinon.stub()
  let selectInput
  let addButton

  describe('before clicked', function () {
    before(function () {
      render(
        <SelectCollection
          collections={mockCollections}
          onSearch={onSearch}
          userID='123'
        />
      )
      selectInput = document.querySelector('input')
      addButton = screen.getByText(
        'CollectionsModal.SelectCollection.addButton'
      )
    })

    it('should be empty by default', function () {
      expect(selectInput.value).to.equal('')
    })

    it('should contain an Add button', function () {
      expect(addButton).toBeDefined()
    })
  })

  // user.click is not opening the listbox
  describe.skip('click to open the listbox', function () {
    let searchBar, selectButton

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

    before(async function () {
      const user = userEvent.setup({ delay: 'none' })
      render(
        <SelectCollection
          collections={mockCollections}
          onSearch={onSearch}
          userID='123'
        />
      )

      selectButton = document.querySelector('#collectionsSearch')
      await user.click(selectButton)
      searchBar = document.querySelector('input[type="search"]')
      // await user.type(searchBar, 'coll') // causes [TypeError: activeElement.attachEvent is not a function]
    })

    it('should call the onSearch callback', async function () {
      // sinon.assert.callCount(onSearch, 4)
      // sinon.assert.calledWith(onSearch, baseQuery)
      // sinon.assert.calledOnceWithExactly(onSearch, textQuery) // only query panoptes when text search is >4 characters

      // expect(onSearch).to.have.callCount(4)
      // expect(onSearch.withArgs(baseQuery)).to.have.been.calledThrice()
      // expect(onSearch.withArgs(textQuery)).to.have.been.calledOnce() // only query panoptes when text search is >4 characters
    })
  })
})
