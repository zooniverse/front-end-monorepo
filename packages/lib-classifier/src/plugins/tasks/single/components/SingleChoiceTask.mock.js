export const SingleChoiceTaskDataMock = ({ isThereTaskHelp = false, required = false }) => {
  return {
    init: {
      answers: [{ label: 'yes' }, { label: 'no' }],
      required,
      strings: {
        help: (isThereTaskHelp) ? 'Choose an answer from the choices given, then press Done.' : '',
        question: 'Is there a cat?',
        'answers.0.label': 'yes',
        'answers.1.label': 'no'
      },
      taskKey: 'init',
      type: 'single'
    }
  }
}