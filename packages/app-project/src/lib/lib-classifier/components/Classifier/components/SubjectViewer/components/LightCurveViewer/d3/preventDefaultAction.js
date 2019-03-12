import * as d3 from 'd3'

export default function preventDefaultAction () {
  d3.event.stopPropagation()
  d3.event.preventDefault()
}
