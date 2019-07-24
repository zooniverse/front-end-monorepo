import * as d3 from 'd3'
import addAxisLayer from './addAxisLayer'

describe('LightCurveViewer > d3 > addAxisLayer', function () {
  const style = {
    color: 'blue',
    fontSize: '12px',
    fontFamily: 'Ariel'
  }
  const axisXLabel = 'x axis'
  const axisYLabel = 'y axis'

  let body, d3svg, node, xAxis, yAxis
  beforeEach(function () {
    body = document.getElementsByTagName('body')[0]
    node = document.createElement('svg')
    body.appendChild(node)
    d3svg = d3.select(node)
    const yScale = d3.scaleLinear()
    xAxis = d3.axisTop(yScale)
    yAxis = d3.axisRight(yScale)
  })

  afterEach(function () {
    body.removeChild(node)
  })

  it('should exist', function () {
    expect(addAxisLayer).to.be.a('function')
  })

  it('should add three svg groups with class names', function () {
    addAxisLayer(d3svg, style, xAxis, yAxis, axisXLabel, axisYLabel)

    expect(node.querySelectorAll('g.axis-layer')).to.have.lengthOf(1)
    expect(node.querySelectorAll('g.x-axis')).to.have.lengthOf(1)
    expect(node.querySelectorAll('g.y-axis')).to.have.lengthOf(1)
  })

  it('should style the axis with the color in the style object parameter', function () {
    addAxisLayer(d3svg, style, xAxis, yAxis, axisXLabel, axisYLabel)
    const xAxisNode = node.querySelector('g.x-axis')
    const yAxisNode = node.querySelector('g.y-axis')
    expect(xAxisNode.getAttribute('color')).to.equal(style.color)
    expect(yAxisNode.getAttribute('color')).to.equal(style.color)
  })

  it('should add the text labels', function () {
    addAxisLayer(d3svg, style, xAxis, yAxis, axisXLabel, axisYLabel)
    const xAxisLabelNode = node.querySelector('text.x-axis-label')
    const yAxisLabelNode = node.querySelector('text.y-axis-label')

    expect(xAxisLabelNode.innerHTML).to.equal(axisXLabel)
    expect(xAxisLabelNode.style.fill).to.equal(style.color)
    expect(xAxisLabelNode.style['font-size']).to.equal(style.fontSize)
    expect(xAxisLabelNode.style['font-family']).to.equal(style.fontFamily)

    expect(yAxisLabelNode.innerHTML).to.equal(axisYLabel)
    expect(yAxisLabelNode.style.fill).to.equal(style.color)
    expect(yAxisLabelNode.style['font-size']).to.equal(style.fontSize)
    expect(yAxisLabelNode.style['font-family']).to.equal(style.fontFamily)
  })
})
