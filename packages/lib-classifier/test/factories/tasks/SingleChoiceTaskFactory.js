import { Factory } from 'rosie'

export default new Factory()
  .attr('answers', [
    { label: 'Yes' },
    { label: 'No' }
  ])
  .attr('required', 'true')
  .attr('strings', {
    question: 'Is there a galaxy?'
  })
  .attr('taskKey', '')
  .attr('type', 'single')
