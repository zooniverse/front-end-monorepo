import { Factory } from 'rosie'

export default new Factory()
  .attr('modifiers', [
    'insertion',
    'deletion'
  ])
  .attr('help', '')
  .attr('required', false)
  .attr('instruction', 'Enter some text')
  .attr('taskKey', '')
  .attr('type', 'text')