// Old enzyme tests are here for reference, but enzyme is no longer used in this library (Aug’ 25)

describe.skip('Component > LightCurveViewerContainer', function () {})

// import { Provider } from 'mobx-react'
// import * as d3 from 'd3'
// import { zip } from 'lodash'

// import mockStore from '@test/mockStore'
// import { LightCurveViewerContainer } from './LightCurveViewerContainer'
// import LightCurveViewer from './LightCurveViewer'
// import kepler from '../../helpers/mockLightCurves/kepler'
// import { Factory } from 'rosie'

// describe('Component > LightCurveViewerContainer', function () {
//   let wrapper

//   const mockData = kepler
//   const nextSubjectJSON = { x: [1, 2], y: [3, 4] }

//   const subjectSnapshot = Factory.build('subject', { locations: [
//     { 'application/json': 'http://localhost:8080/mockData.json' }
//   ] })

//   it('should render without crashing', function () {
//     const classifierStore = mockStore({ subject: subjectSnapshot })
//     wrapper = mount(
//       <LightCurveViewerContainer onKeyDown={() => {}} />,
//       {
//         wrappingComponent: Provider,
//         wrappingComponentProps: { classifierStore }
//       }
//     )
//     expect(wrapper).to.be.ok()
//   })

//   describe('without a subject', function () {
//     it('should render null with the default props', function () {
//       const classifierStore = mockStore({ subject: subjectSnapshot })
//       wrapper = mount(
//         <LightCurveViewerContainer onKeyDown={() => { }} />,
//         {
//           wrappingComponent: Provider,
//           wrappingComponentProps: { classifierStore }
//         }
//       )
//       expect(wrapper.html()).to.be.null()
//     })
//   })

//   describe('with data', function () {
//     const mockD3XExtent = d3.extent(mockData.x)
//     const mockD3YExtent = d3.extent(mockData.y)
//     const mockZipData = zip(mockData.x, mockData.y)

//     it('should set the component state with the json data', function () {
//       const classifierStore = mockStore({ subject: subjectSnapshot })
//       const wrapper = mount(
//         <LightCurveViewerContainer
//           data={mockData}
//           onKeyDown={() => { }}
//         />,
//         {
//           wrappingComponent: Provider,
//           wrappingComponentProps: { classifierStore }
//         }
//       )
//       const lcv = wrapper.find(LightCurveViewer)
//       const { dataExtent, dataPoints } = lcv.props()

//       dataExtent.x.forEach((xDataPoint, index) => {
//         expect(xDataPoint).to.equal(mockD3XExtent[index])
//       })

//       dataExtent.y.forEach((yDataPoint, index) => {
//         expect(yDataPoint).to.equal(mockD3YExtent[index])
//       })

//       expect(dataPoints).to.have.lengthOf(mockZipData.length)
//     })

//     it('should update component state when there is a new valid subject', function () {
//       const nextSubjectJSONZip = zip(nextSubjectJSON.x, nextSubjectJSON.y)
//       const nextSubjectD3XExtent = d3.extent(nextSubjectJSON.x)
//       const nextSubjectD3YExtent = d3.extent(nextSubjectJSON.y)

//       const classifierStore = mockStore({ subject: subjectSnapshot })
//       const wrapper = mount(
//         <LightCurveViewerContainer
//           data={mockData}
//           onKeyDown={() => { }}
//         />,
//         {
//           wrappingComponent: Provider,
//           wrappingComponentProps: { classifierStore }
//         }
//       )

//       wrapper.setProps({
//         data: nextSubjectJSON
//       })
//       wrapper.update()
//       const lcv = wrapper.find(LightCurveViewer)
//       const { dataExtent, dataPoints } = lcv.props()

//       dataExtent.x.forEach((xDataPoint, index) => {
//         expect(xDataPoint).to.equal(nextSubjectD3XExtent[index])
//       })

//       dataExtent.y.forEach((yDataPoint, index) => {
//         expect(yDataPoint).to.equal(nextSubjectD3YExtent[index])
//       })

//       expect(dataPoints).to.have.lengthOf(nextSubjectJSONZip.length)
//     })
//   })
// })
