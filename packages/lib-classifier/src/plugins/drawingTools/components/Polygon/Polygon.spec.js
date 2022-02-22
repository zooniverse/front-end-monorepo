import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Polygon as PolygonModel } from '../../models/marks'
import Polygon from './Polygon'

describe.only('Polygon tool', function () {
  it('should render without crashing', function () {
    const mark = PolygonModel.create({
      id: 'polygon01',
      toolType: 'polygon',
      points: [
        { x: 344.23, y: 201.06 },
        { x: 400.23, y: 252.39 },
        { x: 349.52, y: 334.82 },
        { x: 273.08, y: 273.65 },
        { x: 348.17, y: 270.45 }
      ]
    })

    const wrapper = shallow(<Polygon mark={mark} />)
    expect(wrapper).to.be.ok()
  })
})
