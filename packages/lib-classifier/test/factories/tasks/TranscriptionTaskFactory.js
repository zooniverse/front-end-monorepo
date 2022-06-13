import { Factory } from 'rosie'

export default new Factory()
  .attr('instruction', 'Please transcribe the text')
  .attr('tools', [{
    details: [{
      instruction: 'transcribe the text.',
      taskKey: 'T0.0',
      type: 'text'
    }],
    type: 'transcriptionLine'
  }])
  .attr('type', 'transcription')