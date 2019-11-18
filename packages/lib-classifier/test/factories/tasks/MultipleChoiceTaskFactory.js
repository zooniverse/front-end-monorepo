import { Factory } from 'rosie'

export default new Factory()
  .attr('answers', [
    { label: 'red', _key: 1 },
    { label: 'blue', _key: 2 },
    { label: 'green', _key: 3 }
  ])
  .attr('help', '')
  .attr('required', false)
  .attr('question', 'Check all of the colors that apply')
  .attr('type', 'multiple')
