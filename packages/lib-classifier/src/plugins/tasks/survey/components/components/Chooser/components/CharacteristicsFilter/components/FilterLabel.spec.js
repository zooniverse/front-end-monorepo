import { expect } from 'chai'
import { render, screen } from '@testing-library/react'

import FilterLabel from './FilterLabel'

const CTDG_SRC = 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/475c469d-448f-4207-8a58-2cb42a3faa60.svg'

describe('Component > FilterButton', function () {
  it('should show the characteristic value element', function () {
    render (
      <FilterLabel
        characteristicId='LK'
        valueId='CTDG'
        valueImageSrc={CTDG_SRC}
        valueLabel='cat/dog'
      />
    )

    expect(screen.getByTestId('filter-LK-CTDG')).to.be.ok()
  })

  describe('when selected', function () {
    it('should show a close icon', function () {
      render (
        <FilterLabel
          characteristicId='LK'
          selected={true}
          valueId='CTDG'
          valueImageSrc={CTDG_SRC}
          valueLabel='cat/dog'
        />
      )

      expect(screen.getByLabelText('FormClose')).to.be.ok()
    })
  })
})
