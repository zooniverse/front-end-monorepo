import { Factory } from 'rosie'

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('annotations', {})
  .attr('completed', false)
  .attr('links', {})
  .attr('metadata', {
    classifier_version: '2.0',
    source: 'api',
    userLanguage: '',
    workflowVersion: ''
  })
