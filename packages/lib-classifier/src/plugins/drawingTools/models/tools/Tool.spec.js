import Tool from './Tool'

const toolData = {
  color: '#ff0000',
  label: 'Point',
  max: '10',
  min: 1
}

describe('Model > DrawingTools > Tool', function () {
  it('should exist', function () {
    const tool = Tool.create(toolData)
    expect(tool).to.exist()
    expect(tool).to.be.an('object')
  })
  
  describe('tool.createMark', function () {
    it('should add a new mark', function () {
      const mark = { id: '1' }
      const tool = Tool.create(toolData)
      tool.createMark(mark)
      expect(tool.marks.size).to.equal(1)
    })
  })

  describe('tool.deleteMark', function () {
    it('should remove a mark', function () {
      const mark = { id: '1' }
      const tool = Tool.create(toolData)
      tool.createMark(mark)
      tool.deleteMark(mark)
      expect(tool.marks).to.be.empty()
    })
  })

  describe('with fewer than the minimum marks', function () {
    let tool

    before(function () {
      tool = Tool.create(toolData)
    })

    it('should be incomplete', function () {
      expect(tool.isComplete).to.be.false()
    })

    it('should not be disabled', function () {
      expect(tool.disabled).to.be.false()
    })
  })
  
  describe('with the minimum marks but fewer than the maximum marks', function () {
    let tool

    before(function () {
      tool = Tool.create(toolData)
      const ids = ['1', '2']
      ids.forEach(id => tool.createMark({ id }))
    })

    it('should be complete', function () {
      expect(tool.isComplete).to.be.true()
    })

    it('should not be disabled', function () {
      expect(tool.disabled).to.be.false()
    })
  })
  
  describe('with the maximum marks', function () {
    it('should be disabled', function () {
      const tool = Tool.create(toolData)
      const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      ids.forEach(id => tool.createMark({ id }))
      expect(tool.disabled).to.be.true()
    })
  })
})
