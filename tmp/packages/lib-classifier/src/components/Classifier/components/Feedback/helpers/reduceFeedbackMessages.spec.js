import reduceFeedbackMessages from './reduceFeedbackMessages'

const FEEDBACK_MESSAGES = [
  'foo',
  'foo',
  'foo',
  'bar',
  'bar',
]

describe('Helpers > reduceFeedbackMessages', function () {
  it('should exist', function () {
    expect(reduceFeedbackMessages).to.be.a('function')
  })

  it('should reduce an array of messages to a collection of unique messages with counts', function () {
    const reduced = reduceFeedbackMessages(FEEDBACK_MESSAGES)
    expect(reduced).to.deep.equal([
      { text: 'foo', count: 3 },
      { text: 'bar', count: 2 },
    ])
  })
})
