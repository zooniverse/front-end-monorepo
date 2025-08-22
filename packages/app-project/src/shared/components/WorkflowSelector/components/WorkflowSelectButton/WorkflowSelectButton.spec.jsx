// Old enzyme tests are here for reference, but we no longer use enzyme in this app (Aug '25)
describe.skip('Component > WorkflowSelector > WorkflowSelectButton', function () {})

// import { Grommet } from 'grommet'
// import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
// import sinon from 'sinon'
// import zooTheme from '@zooniverse/grommet-theme'

// import WorkflowSelectButton, { ThemedButton } from './WorkflowSelectButton'
// import Link from 'next/link'
// import { expect } from 'chai'

// describe('Component > WorkflowSelector > WorkflowSelectButton', function () {
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

//   const WORKFLOW = {
//     completeness: 0.4,
//     default: false,
//     displayName: 'Workflow name',
//     id: '1'
//   }

//   const router = {
//     asPath: '/foo/bar',
//     query: {
//       owner: 'foo',
//       project: 'bar'
//     }
//   }

//   it('should render without crashing', function () {
//     const wrapper = mount(
//       <RouterContext.Provider value={mockRouter}>
//         <Grommet theme={zooTheme}>
//           <WorkflowSelectButton router={router} theme={zooTheme} workflow={WORKFLOW} />
//         </Grommet>
//       </RouterContext.Provider>
//     )
//     expect(wrapper).to.be.ok()
//   })

//   it('should not add "set selection" to the label', function () {
//     const wrapper = mount(
//       <RouterContext.Provider value={mockRouter}>
//         <Grommet theme={zooTheme}>
//           <WorkflowSelectButton theme={zooTheme} workflow={WORKFLOW} />
//         </Grommet>
//       </RouterContext.Provider>
//     )
//     const label = shallow(wrapper.find(ThemedButton).prop('label')).render()
//     expect(label.text()).to.equal('WorkflowSelector.WorkflowSelectButton.completeWorkflow name')
//     /** The translation function will simply return keys in a testing env */
//   })

//   describe('when used with a default workflow', function () {
//     it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
//       const wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <Grommet theme={zooTheme}>
//             <WorkflowSelectButton
//               router={router}
//               theme={zooTheme}
//               workflow={{
//                 ...WORKFLOW,
//                 default: true
//               }}
//             />
//           </Grommet>
//         </RouterContext.Provider>
//       )
//       expect(wrapper.find(Link).prop('href')).to.equal(`${router.asPath}/classify/workflow/${WORKFLOW.id}`)
//     })
//   })

//   describe('when used with a non-default workflow', function () {
//     it('should be a link pointing to `/classify/workflow/:workflow_id`', function () {
//       const wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <Grommet theme={zooTheme}>
//             <WorkflowSelectButton router={router} theme={zooTheme} workflow={WORKFLOW} />
//           </Grommet>
//         </RouterContext.Provider>
//       ).find(WorkflowSelectButton)
//       expect(wrapper.find(Link).prop('href')).to.equal(`${router.asPath}/classify/workflow/${WORKFLOW.id}`)
//     })
//   })

//   describe('with a grouped workflow', function () {
//     let wrapper

//     before(function () {
//       const groupedWorkflow = {
//         ...WORKFLOW,
//         grouped: true
//       }
//       wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <Grommet theme={zooTheme}>
//             <WorkflowSelectButton router={router} theme={zooTheme} workflow={groupedWorkflow} />
//           </Grommet>
//         </RouterContext.Provider>
//       )
//     })

//     it('should add "set selection" to the label', function () {
//       const label = shallow(wrapper.find(ThemedButton).prop('label')).render()
//       expect(label.text()).to.equal('WorkflowSelector.WorkflowSelectButton.complete·WorkflowSelector.WorkflowSelectButton.setSelectionWorkflow name')
//       /** The translation function will simply return keys in a testing env */
//     })
//   })

//   describe('when disabled', function () {
//     it('should not have an href', function () {
//       const wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <Grommet theme={zooTheme}>
//             <WorkflowSelectButton disabled router={router} theme={zooTheme} workflow={WORKFLOW} />
//           </Grommet>
//         </RouterContext.Provider>
//       ).find(WorkflowSelectButton)
//       expect(wrapper.prop('href')).to.be.undefined()
//     })

//     it('should not wrap the button with Link', function () {
//       const wrapper = mount(
//         <RouterContext.Provider value={mockRouter}>
//           <Grommet theme={zooTheme}>
//             <WorkflowSelectButton disabled router={router} theme={zooTheme} workflow={WORKFLOW} />
//           </Grommet>
//         </RouterContext.Provider>
//       )
//       expect(wrapper.find(Link)).to.have.lengthOf(0)
//     })
//   })
// })
