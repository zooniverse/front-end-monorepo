import cuid from 'cuid'
import { Factory } from 'rosie'

export default new Factory()
  .attr('id', cuid())
  .attr('task', 'T0')
  .attr('taskType', 'single')
  .attr('value', 0)
