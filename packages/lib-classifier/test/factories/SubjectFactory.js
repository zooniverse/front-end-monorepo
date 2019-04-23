import { Factory } from 'rosie'

const subject = Factory.define('subject')
  .sequence('id', (id) => { return id.toString() })
  .attr('already_seen', false)
  .attr('favorite', false)
  .attr('finished_workflow', false)
  .attr('locations', () => {
    return [1, 2].map((int) => {
      const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
      return { 'image/png': `https://foo.bar/${randomString}.png` }
    })
  })
  .attr('metadata', {})
  .attr('retired', false)
  .attr('selected_at', "2019-04-11T11:16:29.063Z")
  .attr('selection_state', '')
  .attr('user_has_finished_workflow', false)

export default subject