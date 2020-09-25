import { Factory } from 'rosie'

export default Factory.define('subject_set')
  .sequence('id', (id) => { return id.toString() })
  .attr('display_name', 'Hello there!')
  .attr('set_member_subjects_count', 56)
  .attr('links', {})
