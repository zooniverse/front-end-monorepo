import { types } from 'mobx-state-tree'

const Task = types.model('Task', {
  taskKey: types.identifier
})

// TODO: should we make question/instruction consistent between task types?
// What should be it called? I think we should use 'instruction'
const SingleChoice = types.model('SingleChoice', {
  answers: types.array(types.frozen({
    label: types.string,
    next: types.maybe(types.string)
  })),
  help: types.optional(types.string, ''),
  question: types.string,
  required: types.boolean,
  type: types.literal('single')
})

const MultipleChoice = types.model('MultipleChoice', {
  answers: types.array(types.frozen({
    _key: types,
    label: types.string
  })),
  help: types.optional(types.string, ''),
  question: types.string,
  required: types.boolean,
  type: types.literal('multiple')
})

export const SingleChoiceTask = types.compose(Task, SingleChoice)
export const MultipleChoiceTask = types.compose(Task, MultipleChoice)
export default Task

// TODO: Lets have models for all of the task types of these so we know what to expect

// Current task type conventions

// Single answer question task type 

// {
//  answers: [
//    { label: "", next: "" },
//    { label: "", next: "" }
//  ],
//  help: "",
//  question: "Enter a question.",
//  required: true,
//  type: "single"
// }

// Multiple answer question task type

// {
//   answers: [
//     { _key: 0.3873825261449235, label: "Enter an answer" },
//     { _key: 0.12898305208771355, label: "Enter an answer" }
//   ],
//   help: "",
//   question: "Enter a question.",
//   type: "multiple"
// }

// Survey task type
// Still need further definitions in each...
// {
//   characteristics: {},
//   characteristicsOrder: [],
//   choices: {},
//   choicesOrder: [],
//   images: {},
//   questions: {},
//   questionsMap: {},
//   questionsOrder: [],
//   type: "survey"
// }

// Drawing task type
// Need to define tools...
// {
//   help: "",
//   instruction: "Explain what to draw.",
//   next:"T3",
//   tools: [],
//   type: "drawing"
// }

// Dropdown task type

// {
//   help: "",
//   instruction: "Select or type an option",
//   selects: [
//     {
//       allowCreate: false,
//       id: "5b6c11451631a",
//       options: {},
//       required: true,
//       title: "Main Dropdown"
//     }
//   ],
//   type: "dropdown"
// }

// Text task type

// {
//   help: "",
//   instruction: "Enter an instruction.",
//   type: "text"
// }

// Highlighter task type

// {
//   help: "",
//   highlighterLabels: [
//     { _key: 0.04709007309286495, color: "#C9F227", label: "Enter label" }
//   ],
//   instruction: "Highlight the text",
//   type: "highlighter"
// }