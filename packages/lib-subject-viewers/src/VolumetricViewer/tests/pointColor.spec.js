import { pointColor } from './../helpers/pointColor'

describe('Component > VolumetricViewer > pointColor', () => {
  it('should generate the right color for non-annotated, non-three color', () => {
    const color = pointColor({ annotationIndex: -1, isThree: false, pointValue: 0 })
    expect(color).to.equal('hsl(0, 0%, 0%)')
  })

  it('should generate the right color for non-annotated, three color', () => {
    const color = pointColor({ annotationIndex: -1, isThree: true, pointValue: 0 })
    expect(color).deep.to.equal({
      isColor: true,
      r: 0,
      g: 0,
      b: 0
    })
  })

  it('should generate the right color for annotated, non-three color', () => {
    const color = pointColor({ annotationIndex: 1, isThree: false, pointValue: 0 })
    expect(color).to.equal('hsl(60, 100%, 0%)')
  })

  it('should generate the right color for annotated, three color', () => {
    const color = pointColor({ annotationIndex: 1, isThree: true, pointValue: 50 })
    expect(color).deep.to.equal({
      isColor: true,
      r: 0.05497173268044313,
      g: 0.054971732680443156,
      b: 0
    })
  })

  it('should generate the right color for annotated, three color, overloaded index', () => {
    const color = pointColor({ annotationIndex: 13, isThree: true, pointValue: 50 })
    expect(color).deep.to.equal({
      isColor: true,
      r: 0.05497173268044313,
      g: 0.054971732680443156,
      b: 0
    })
  })

  it('should generate the right color for annotated, three color, overloaded index', () => {
    const color = pointColor({ annotationIndex: 1, isThree: true, pointValue: 50 })
    expect(color).deep.to.equal({
      isColor: true,
      r: 0.05497173268044313,
      g: 0.054971732680443156,
      b: 0
    })
  })
})
