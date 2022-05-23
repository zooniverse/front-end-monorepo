import { Factory } from 'rosie'

export default new Factory()
  .attr('answers', [
    { label: 'red' },
    { label: 'blue' },
    { label: 'green' }
  ])
  .attr('required', '')
  .attr('question', 'Check all of the colors that apply')
  .attr('type', 'multiple')
