import * as d3 from 'd3'

import addDataMask from './addDataMask'

const outerMargin = 10
const id = 1
describe('LightCurveViewer > d3 > addDataMask', function () {
  let body, node, d3svg
  before(function () {
    body = document.getElementsByTagName('body')[0]
    node = document.createElement('svg')
    body.appendChild(node)
    d3svg = d3.select(node)
  })

  after(function () {
    body.removeChild(node)
  })

  afterEach(function () {
    node.innerHTML = ''
  })

  it('should exist', function () {
    expect(addDataMask).to.be.a('function')
  })

  it('should append a clip path with the correct attributes to the selection', function () {
    addDataMask(d3svg, outerMargin, id)
    expect(node.querySelectorAll(`clipPath#data-mask-${id}`)).to.have.lengthOf(1)
  })

  it('should append a rect with the correct attributes to the selection', function () {
    addDataMask(d3svg, outerMargin, id)
    const rect = node.querySelectorAll('rect.data-mask')
    expect(node.querySelectorAll('rect.data-mask')).to.have.lengthOf(1)
    expect(rect[0].getAttribute('transform')).to.equal(`translate(${outerMargin}, ${outerMargin})`)
    expect(rect[0].getAttribute('width')).to.equal('0')
    expect(rect[0].getAttribute('height')).to.equal('0')
  })
})
