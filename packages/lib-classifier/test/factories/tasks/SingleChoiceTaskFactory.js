import { Factory } from 'rosie'

export default new Factory()
  .attr('answers', [
    { label: 'Yes', next: 'S2' },
    { label: 'No', next: 'S3' }
  ])
  .attr('help', '')
  .attr('required', 'true')
  .attr('question', 'Is there a galaxy?')
  .attr('taskKey', '')
  .attr('type', 'single')
