import { Factory } from 'rosie'

export default new Factory()
  .attr('answers', [
    { label: 'Yes' },
    { label: 'No' }
  ])
  .attr('help', '')
  .attr('required', 'true')
  .attr('question', 'Is there a galaxy?')
  .attr('taskKey', '')
  .attr('type', 'single')
