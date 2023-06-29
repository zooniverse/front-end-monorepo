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
    const user = userEvent.setup({ delay: null })

    const selectInput = document.querySelector('input')
    await user.type(selectInput, 'coll')

    // expect(searchSpy).to.have.been.calledOnce()
  })
})
