import { LineTool } from '@plugins/drawingTools/models/tools'

const line = {
  color: '#ff0000',
  label: '',
  max: '10',
  min: 1,
  type: 'line'
}

describe('Model > DrawingTools > Line', function () {
  it('should exist', function () {
    const lineToolInstance = LineTool.create(line)
    expect(lineToolInstance).to.exist
    expect(lineToolInstance).to.be.an('object')
  })

  it('should have a property `type` of `line`', function () {
    const lineToolInstance = LineTool.create(line)
    expect(lineToolInstance).to.deep.include({ type: 'line' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => LineTool.create({ type: 'purple' })).to.throw()
  })
})
