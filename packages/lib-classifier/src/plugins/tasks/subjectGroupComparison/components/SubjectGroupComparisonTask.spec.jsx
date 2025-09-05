// Old enzyme tests are here for reference, but enzyme is no longer used in this library (Aug’ 25)

describe.skip('SubjectGroupComparisonTask', function () {})

// import SubjectGroupComparisonTask from './SubjectGroupComparisonTask'
// import { default as Task } from '@plugins/tasks/subjectGroupComparison'

// describe('SubjectGroupComparisonTask', function () {
//   const task = Task.TaskModel.create({
//     required: true,
//     strings: {
//       question: 'Please select the cells that look weird.'
//     },
//     taskKey: 'init',
//     type: 'subjectGroupComparison'
//   })
//   const annotation = task.defaultAnnotation()

//   describe('when it renders', function () {
//     let wrapper
//     before(function () {
//       wrapper = shallow(<SubjectGroupComparisonTask annotation={annotation} task={task} />)
//     })

//     it('should render without crashing', function () {
//       expect(wrapper).to.be.ok()
//     })

//     it('should have a question', function () {
//       expect(wrapper.contains(task.question)).to.be.true()
//     })
//   })
// })
