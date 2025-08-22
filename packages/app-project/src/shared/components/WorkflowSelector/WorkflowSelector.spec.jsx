// Old enzyme tests are here for reference, but we no longer use enzyme in this app (Aug '25)

describe.skip('Component > WorkflowSelector', function () {})

// import asyncStates from '@zooniverse/async-states'
// import { mount } from 'enzyme'
// import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

// import WorkflowSelector from './WorkflowSelector'
// import WorkflowSelectButtons from './components/WorkflowSelectButtons'
// import { expect } from 'chai'

// describe('Component > WorkflowSelector', function () {
//   const mockRouter = {
//     asPath: '/zooniverse/snapshot-serengeti/about/team',
//     basePath: '/projects',
//     locale: 'en',
//     push() {},
//     prefetch: () => new Promise((resolve, reject) => {}),
//     query: {
//       owner: 'zooniverse',
//       project: 'snapshot-serengeti'
//     }
//   }

//   const THEME = {
//     global: {
//       colors: {
//         brand: '#000'
//       }
//     }
//   }

//   const WORKFLOWS = [
//     {
//       id: '1234',
//       displayName: 'a test workflow'
//     },
//     {
//       id: '3456',
//       displayName: 'another test workflow'
//     }
//   ]

//   const WORKFLOW_DESCRIPTION = 'Sit nulla mi metus tellus aenean lobortis litora'
//   const DEFAULT_WORKFLOW_DESCRIPTION = 'WorkflowSelector.message'
//   /** The translation function will simply return keys in a testing env */

//   it('should render without crashing', function () {
//     const wrapper = mount(
//       <RouterContext.Provider value={mockRouter}>
//         <WorkflowSelector
//           theme={THEME}
//           workflows={WORKFLOWS}
//           workflowDescription={WORKFLOW_DESCRIPTION}
//         />
//       </RouterContext.Provider>
//     )
//     expect(wrapper).to.be.ok()
//   })

//   describe('workflow description', function () {
//     it('should use the `workflowDescription` prop if available', function () {
//       const wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <WorkflowSelector
//             theme={THEME}
//             workflows={WORKFLOWS}
//             workflowDescription={WORKFLOW_DESCRIPTION}
//           />
//         </RouterContext.Provider>
//       )
//       expect(wrapper.contains(WORKFLOW_DESCRIPTION)).to.be.true()
//     })

//     it('should use the default message if the `workflowDescription` prop is unset', function () {
//       const wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <WorkflowSelector
//             theme={THEME}
//             workflows={WORKFLOWS}
//           />
//         </RouterContext.Provider>
//       )
//       expect(wrapper.contains(DEFAULT_WORKFLOW_DESCRIPTION)).to.be.true()
//     })

//     it('should use the default message if the `workflowDescription` prop is an empty string', function () {
//       const wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <WorkflowSelector
//             theme={THEME}
//             workflows={WORKFLOWS}
//             workflowDescription=''
//           />
//         </RouterContext.Provider>
//       )
//       expect(wrapper.contains(DEFAULT_WORKFLOW_DESCRIPTION)).to.be.true()
//     })
//   })

//   describe('when successfully loaded the user state and loaded the user project preferences', function () {
//     it('should render workflow select buttons', function () {
//       const wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <WorkflowSelector
//             uppLoaded={true}
//             userReadyState={asyncStates.success}
//             theme={THEME}
//             workflows={WORKFLOWS}
//           />
//         </RouterContext.Provider>
//       )
//       expect(wrapper.find(WorkflowSelectButtons)).to.have.lengthOf(1)
//     })
//   })
// })
