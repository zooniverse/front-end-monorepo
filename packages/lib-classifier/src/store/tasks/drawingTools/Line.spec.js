import Line from './Line'

const line = {
  color: '#ff0000',
  label: '',
  max: '10',
  min: 1,
  type: 'line'
}

describe('Model > DrawingTools > Line', function () {
  it('should exist', function () {
    const lineToolInstance = Line.create(line)
    expect(lineToolInstance).to.exist()
    expect(lineToolInstance).to.be.an('object')
  })
})
