import * as d3 from 'd3'
import addAxisLayer from './addAxisLayer'

describe.only('LightCurveViewer > d3 > addAxisLayer', function () {
  const style = {
    color: 'blue',
    fontSize: '12px',
    fontFamily: 'Ariel'
  }
  const axisXLabel = 'x axis'
  const axisYLabel = 'y axis'

  let body, d3svg, node, xAxis, yAxis
  beforeEach(function () {
    const xScale = d3.scaleLinear()
    const yScale = d3.scaleLinear()
    xAxis = d3.axisTop(yScale)
    yAxis = d3.axisRight(yScale)
    body = document.getElementsByTagName('body')[0]
    node = document.createElement('svg')
    body.appendChild(node)
    d3svg = d3.select(node)
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
    expect(xAxisNode.attributes.color).to.equal(styles.color)
    expect(yAxisNode.attributes.color).to.equal(styles.color)
  })

  it('should add the text labels', function () {
    addAxisLayer(d3svg, style, xAxis, yAxis, axisXLabel, axisYLabel)
    const axis = node.querySelectorAll('text')
    console.log('axis', axis)
    // expect(axis.classList.contains('x-axis-label')).to.be.true
    // expect(axis.innerHTML).to.equal(text)
    // expect(axis.style.fill).to.equal(styles.color)
    // expect(axis.style['font-size']).to.equal(styles.fontSize)
    // expect(axis.style['font-family']).to.equal(styles.fontFamily)
  })
})
