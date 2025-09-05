import * as d3 from 'd3'
import addAxisLabel from './addAxisLabel'

describe('LightCurveViewer > d3 > addAxisLabel', function () {
  let body, node
  before(function () {
    body = document.getElementsByTagName('body')[0]
    node = document.createElement('svg')
    body.appendChild(node)
  })

  after(function () {
    body.removeChild(node)
  })

  it('should exist', function () {
    expect(addAxisLabel).to.be.a('function')
  })

  it('should append the svg node with text with a class attribute, styles, and text', function () {
    const className = 'axis-label'
    const text = 'Foo Bar'
    const styles = {
      color: 'blue',
      fontSize: '12px',
      fontFamily: 'Ariel'
    }
    const d3svg = d3.select(node)

    addAxisLabel(d3svg, className, text, styles)
    const axis = node.querySelector('text')
    expect(axis.classList.contains(className)).to.equal(true)
    expect(axis.innerHTML).to.equal(text)
    expect(axis.style.fill).to.equal(styles.color)
    expect(axis.style['font-size']).to.equal(styles.fontSize)
    expect(axis.style['font-family']).to.equal(styles.fontFamily)
  })
})
