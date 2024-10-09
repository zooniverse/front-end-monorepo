import { pointColor } from './../helpers/pointColor'

describe('Component > VolumetricViewer > pointColor', () => {
  it('should generate the right color for non-annotated, non-three color', () => {
    const color = pointColor({ annotationIndex: -1, isThree: false, pointValue: 0 })
    expect(color).to.equal('hsl(205, 0%, 25%)')
  })

  it('should generate the right color for non-annotated, three color', () => {
    const color = pointColor({ annotationIndex: -1, isThree: true, pointValue: 0 })
    expect(color).deep.to.equal({
      isColor: true,
      r: 0.050876088164650994,
      g: 0.050876088164650994,
      b: 0.050876088164650994
    })
  })

  it('should generate the right color for annotated, non-three color', () => {
    const color = pointColor({ annotationIndex: 1, isThree: false, pointValue: 0 })
    expect(color).to.equal('hsl(60, 75%, 25%)')
  })

  it('should generate the right black for annotated, three color', () => {
    const color = pointColor({ annotationIndex: 1, isThree: true, pointValue: 0 })
    expect(color).deep.to.equal({
      isColor: true,
      r: 0.16068267770835676,
      g: 0.16068267770835684,
      b: 0.005155668396761914
    })
  })
})
