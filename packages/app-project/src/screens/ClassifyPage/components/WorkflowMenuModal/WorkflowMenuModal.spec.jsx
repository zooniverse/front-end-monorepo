// Old enzyme tests are here for reference, but we no longer use enzyme in this app (Aug '25)
describe.skip('Component > ClassifyPage > WorkflowMenuModal', function () {})

// import asyncStates from '@zooniverse/async-states'
// import { Provider } from 'mobx-react'
// import { applySnapshot } from 'mobx-state-tree'
// import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

// import initStore, { cleanStore } from '@stores'
// import WorkflowMenuModal from './WorkflowMenuModal'

// import WorkflowSelector from '@shared/components/WorkflowSelector'
// import SubjectSetPicker from '@shared/components/SubjectSetPicker'
// import SubjectPicker from '@shared/components/SubjectPicker'

// describe('Component > ClassifyPage > WorkflowMenuModal', function () {
//   const mockRouter = {
//     asPath: '/projects/zooniverse/snapshot-serengeti/about/team',
//     query: {
//       owner: 'zooniverse',
//       project: 'snapshot-serengeti'
//     }
//   }

//   const snapshot = {
//     project: {
//       background: {
//         src: 'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
//       },
//       description:
//         'Learn about and help document the wonders of nesting Western Bluebirds.',
//       display_name: 'Nest Quest Go: Western Bluebirds',
//       slug: 'brbcornell/nest-quest-go-western-bluebirds',
//       workflow_description: `Choose your own adventure! There are many ways to engage with this project:
//         1) "Nest Site": Smartphone-friendly, helps us understand where Western Bluebirds build their nests.
//         2) "Location": Smartphone-friendly, series of questions on the geographic location of the nest.
//         3) "Nest Attempt: Smartphone-friendly, for data-entry lovers to record nest attempt data on cards.
//         4) "Comments": For transcription lovers, we ask you to transcribe all the written comments on the cards.`
//     },
//     user: {
//       loadingState: asyncStates.success,
//       personalization: {
//         projectPreferences: {
//           loadingState: asyncStates.success
//         }
//       }
//     }
//   }

//   function TestWrapper({ children }) {
//     const store = initStore(true, snapshot)
//     applySnapshot(store.user, snapshot.user)
//     return(
//       <Provider store={store}>
//         <RouterContext.Provider value={mockRouter}>
//           {children}
//         </RouterContext.Provider>
//       </Provider>
//     )
//   }

//   describe.skip('without a selected workflow', function () {
//     let wrapper
//     let workflows = [{
//       id: '1234',
//     }]

//     beforeEach(function () {
//       wrapper = mount(
//         <WorkflowMenuModal workflows={workflows} />,
//         {
//           wrappingComponent: TestWrapper
//         }
//       )
//     })

//     afterEach(function () {
//       cleanStore()
//     })

//     it('should show a workflow selector', function () {
//       expect(wrapper.find(WorkflowSelector)).to.have.lengthOf(1)
//     })
//   })

//   describe.skip('with a selected workflow', function () {
//     let wrapper
//     let workflows = [{
//       id: '1234',
//       grouped: true
//     }]

//     beforeEach(function () {
//       wrapper = mount(
//         <WorkflowMenuModal workflowFromUrl={workflows[0]} workflows={workflows} />,
//         {
//           wrappingComponent: TestWrapper
//         }
//       )
//     })

//     afterEach(function () {
//       cleanStore()
//     })

//     it('should not show a workflow selector', function () {
//       expect(wrapper.find(WorkflowSelector)).to.have.lengthOf(0)
//     })

//     it('should show a subject set picker', function () {
//       expect(wrapper.find(SubjectSetPicker)).to.have.lengthOf(1)
//     })
//   })

//   describe.skip('with a selected workflow and subject set', function () {
//     let wrapper
//     let workflows = [{
//       id: '1234',
//       grouped: true
//     }]
//     let subjectSet = {
//       id: '345',
//       displayName: 'test set',
//       indexFields: 'title,author'
//     }

//     beforeEach(function () {
//       wrapper = mount(
//         <WorkflowMenuModal
//           subjectSetFromUrl={subjectSet}
//           workflowFromUrl={workflows[0]}
//           workflows={workflows}
//         />,
//         { wrappingComponent: TestWrapper }
//       )
//     })

//     afterEach(function () {
//       cleanStore()
//     })

//     it('should not show a workflow selector', function () {
//       expect(wrapper.find(WorkflowSelector)).to.have.lengthOf(0)
//     })

//     it('should show a subject picker', function () {
//       expect(wrapper.find(SubjectPicker)).to.have.lengthOf(1)
//     })
//   })
// })
