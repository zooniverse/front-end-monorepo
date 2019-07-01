import { Factory } from 'rosie'

export default new Factory()
  .attr('answers', [
    { label: 'red', _key: Math.random() },
    { label: 'blue', _key: Math.random() },
    { labe: 'green', _key: Math.random() }
  ])
  .attr('help', '')
  .attr('required', false)
  .attr('question', 'Check all of the colors that apply')
  .attr('type', 'multiple')
