import { expect } from 'chai'
import React from 'react'
import { render, screen } from '@testing-library/react'

import FilterButton from './FilterButton'

const CTDG_SRC = 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/475c469d-448f-4207-8a58-2cb42a3faa60.svg'

describe('Component > FilterButton', function () {
  it('should show the characteristic value element', function () {
    render (
      <FilterButton
        characteristicId='LK'
        valueId='CTDG'
        valueImageSrc={CTDG_SRC}
        valueLabel='cat/dog'
      />
    )

    expect(screen.getByTestId('filter-LK-CTDG')).to.be.ok()
  })

  it('should not show a Close button', function () {
    render (
      <FilterButton
        characteristicId='LK'
        valueId='CTDG'
        valueImageSrc={CTDG_SRC}
        valueLabel='cat/dog'
      />
    )

    expect(screen.queryByRole('button', { name: 'Remove cat/dog filter' })).to.be.null()  
  })

  describe('when checked', function () {
    it('should show a Close button', function () {
      render (
        <FilterButton
          characteristicId='LK'
          checked
          valueId='CTDG'
          valueImageSrc={CTDG_SRC}
          valueLabel='cat/dog'
        />
      )

      expect(screen.getByRole('button', { name: 'Remove cat/dog filter' })).to.be.ok()    
    })
  })
})
