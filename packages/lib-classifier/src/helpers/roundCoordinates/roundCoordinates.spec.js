import { expect } from 'chai'
import roundCoordinates from '../../helpers/roundCoordinates'

describe('round coordinates', () => {
  it('rounds a set of x, y coordinates to two decimal places', () => {
    expect(
      roundCoordinates({
        x: 34.7855555555555,
        y: 234.8944444444444
      })
    ).to.deep.equal({
      roundedX: 34.79,
      roundedY: 234.89
    })
  })
})
