import { Factory } from 'rosie'
import { observable } from 'mobx'
import oo from 'json8'

const steps = new Map()

steps.set('S1', { taskKeys: ['T1'] })
steps.set('S2', { taskKeys: ['T2', 'T3'] })
steps.set('S3', { taskKeys: ['summary'] })

export default new Factory()
  .sequence('id', (id) => { return id.toString() })
  .attr('display_name', ['id'], function (id) {
    return `Workflow #${id}`
  })
  .attr('active', true)
  .attr('tasks', {
    T1: {
      answers: [
        { label: 'Yes', next: 'S2' },
        { label: 'No', next: 'S3' }
      ],
      question: 'Is there a galaxy?',
      type: 'single'
    },
    T2: {
      answers: [
        { label: 'red', _key: Math.random() },
        { label: 'blue', _key: Math.random() },
        { labe: 'green', _key: Math.random() }
      ],
      question: 'Check all of the colors that apply',
      type: 'multple'
    },
    T3: {
      instruction: 'Add any other notes',
      type: 'text'
    }
  })
  .attr('steps', () => {
    try {
      return oo.serialize(steps) // Steps will be serialized as a standard object and parsed back to a map
    } catch (error) {
      console.error(error)
    }
  })

