import { render } from '@testing-library/react'
import Polygon from './Polygon'

describe('Drawing tools > Polygon', () => {
  it('should render active finished mark without crashing', function () {
    const mark = {
      path: '10,20 90,10 45,60',
      points: [
        { x: 10, y: 20 },
        { x: 90, y: 10 },
        { x: 45, y: 60 }
      ],
      initialPoint: { x: 10, y: 20 },
      lastPoint: { x: 45, y: 60 },
      finished: true
    }

    render(
      <svg xmlns='http://www.w3.org/2000/svg'>
        <Polygon active mark={mark} />
      </svg>
    )
    
    const polygon = document.querySelector('g')
    expect(polygon).to.exist
  })
})

// Old enzyme tests are here for reference, but enzyme is no longer used in this library (Aug’ 25)

describe.skip('Drawing Tools > Polygon tool', function () {})

// import { Polygon as PolygonModel } from '../../models/marks'
// import Polygon from './Polygon'

// describe('Polygon tool', function () {
//   it('should render without crashing', function () {
//     const mark = PolygonModel.create({
//       id: 'polygon01',
//       toolType: 'polygon',
//       points: [
//         { x: 344.23, y: 201.06 },
//         { x: 400.23, y: 252.39 },
//         { x: 349.52, y: 334.82 },
//         { x: 273.08, y: 273.65 },
//         { x: 348.17, y: 270.45 }
//       ]
//     })

//     const wrapper = shallow(<Polygon mark={mark} />)
//     expect(wrapper).to.be.ok()
//   })
// })
