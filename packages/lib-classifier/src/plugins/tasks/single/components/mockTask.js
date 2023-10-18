const mockTask = {
  answers: [{ label: 'yes' }, { label: 'no' }],
  required: true,
  strings: {
    help: 'Choose an answer from the choices given, then press Done.',
    question: 'Is there a cat?',
    'answers.0.label': 'yes',
    'answers.1.label': 'no'
  },
  taskKey: 'init',
  type: 'single'
}

export default mockTask
