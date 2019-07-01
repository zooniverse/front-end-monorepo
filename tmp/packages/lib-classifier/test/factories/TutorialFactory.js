import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('display_name', ['id'], function (id) {
    return `Tutorial #${id}`
  })
  .attr('kind', 'tutorial')
  .attr('language', 'en')
  .attr('steps', [])
