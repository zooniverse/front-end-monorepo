export { default as DrawingTask } from './DrawingTask'
export { default as GraphRangesTask } from './GraphRangesTask'
export { default as MultipleChoiceTask } from './MultipleChoiceTask'
export { default as SingleChoiceTask } from './SingleChoiceTask'
export { default as Task } from './Task'

// TODO: Lets have models for all of the task type so we know what to expect

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
