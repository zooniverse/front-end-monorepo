import { Factory } from 'rosie'

export default new Factory()
  .attr('answers', [
    { label: 'red' },
    { label: 'blue' },
    { label: 'green' }
  ])
  .attr('required', false)
  .attr('strings', {
    question: 'Check all of the colors that apply'
  })
  .attr('type', 'multiple')
