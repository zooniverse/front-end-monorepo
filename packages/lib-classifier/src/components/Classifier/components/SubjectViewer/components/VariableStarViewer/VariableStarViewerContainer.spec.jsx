// Old enzyme tests are here for reference, but enzyme is no longer used in this library (Aug’ 25)

describe.skip('Component > VariableStarViewerContainer', function () {})

// import { getSnapshot } from 'mobx-state-tree'
// import React from 'react';
// import nock from 'nock'
// import sinon from 'sinon'
// import { Factory } from 'rosie'

// import SubjectType from '@store/SubjectStore/SubjectType'
// import { VariableStarViewerContainer } from './VariableStarViewerContainer'
// import VariableStarViewer from './VariableStarViewer'
// import variableStar from '@viewers/helpers/mockLightCurves/variableStar'
// import { additiveDictionary } from './helpers/constants'

// describe('Component > VariableStarViewerContainer', function () {
//   const subjectSnapshot = Factory.build('subject', {
//     locations: [
//       { 'image/png': 'http://localhost:8080/talk-backup.png' },
//       { 'application/json': 'http://localhost:8080/variableStar.json' },
//       { 'image/png': 'http://localhost:8080/image1.png' }
//     ]
//   })
//   const subject = SubjectType.create(subjectSnapshot)

//   // Use text MIME type to test allowed text file fallback
//   const nextSubjectSnapshot = Factory.build('subject', {
//     locations: [
//       { 'image/png': 'http://localhost:8080/talk-backup.png' },
//       { 'text/plain': 'http://localhost:8080/nextSubject.txt' },
//       { 'image/png': 'http://localhost:8080/image2.png' }
//     ]
//   })
//   const nextSubject = SubjectType.create(nextSubjectSnapshot)

//   const nextSubjectJSON = {
//     data: {
//       scatterPlot: {
//         "data": [
//           {
//             "seriesData": [
//               {
//                 "x": 1.46,
//                 "y": 6.37,
//                 "x_error": 2,
//                 "y_error": 0.5
//               }, {
//                 "x": 7.58,
//                 "y": 9.210
//               }
//             ],
//             "seriesOptions": {
//               "color": "accent-1",
//               "label": "Filter 1",
//               "period": 2.5
//             }
//           }, {
//             "seriesData": [
//               {
//                 "x": 19.92215,
//                 "y": -0.1976986301,
//                 "x_error": 2,
//                 "y_error": 0.5
//               }, {
//                 "x": 35.46347,
//                 "y": -0.22472
//               }
//             ],
//             "seriesOptions": {
//               "color": "#98b6a7",
//               "label": "Filter 2",
//               "period": 3.5
//             }
//           }
//         ],
//         "chartOptions": {
//           "xAxisLabel": "Days",
//           "yAxisLabel": "Brightness"
//         }
//       },
//       barCharts: {
//         period: {
//           data: [
//             { label: 'A', value: 0.34742 },
//             { label: 'B', value: 2.37438 }
//           ],
//           chartOptions: {
//             xAxisLabel: 'Period',
//             yAxisLabel: '',
//             yAxisDomain: [0, 3]
//           }
//         },
//         amplitude: {
//           data: [
//             { color: 'accent-3', label: 'X', value: 34.3747 },
//             { color: 'accent-1', label: 'Y', value: 236.3637 }
//           ],
//           chartOptions: {
//             xAxisLabel: 'Amplitude',
//             yAxisLabel: ''
//           }
//         }
//       }
//     }
//   }

//   const mockState = {
//     allowPanZoom: '',
//     barJSON: {
//       amplitude: {
//         data: [],
//         chartOptions: {}
//       },
//       period: {
//         data: [],
//         chartOptions: {}
//       }
//     },
//     highlightedSeries: [],
//     imageLocation: null,
//     invertYAxis: false,
//     periodMultiple: 1,
//     phaseFocusedSeries: 0,
//     phasedJSON: {
//       data: [],
//       chartOptions: {}
//     },
//     phaseLimit: 0.2,
//     rawJSON: {
//       scatterPlot: {
//         data: [],
//         chartOptions: {}
//       },
//       barCharts: {
//         amplitude: {
//           data: [],
//           chartOptions: {}
//         },
//         period: {
//           data: [],
//           chartOptions: {}
//         }
//       }
//     },
//   }

//   it('should render without crashing', function () {
//     const wrapper = shallow(<VariableStarViewerContainer />)
//     expect(wrapper).to.be.ok()
//   })

//   it('should initialize with the default state', function () {
//     const wrapper = shallow(
//       <VariableStarViewerContainer />,
//       { disableLifecycleMethods: true }
//     )

//     expect(wrapper.state()).to.eql(mockState)
//   })

//   describe('with a subject', function () {
//     let nockScope
//     let wrapper
//     let createRefStub
//     const onReadySpy = sinon.spy()

//     before(function () {
//       createRefStub = sinon.stub(React, 'createRef').callsFake(() => {
//         return {
//           current: {
//             container: {
//               getBoundingClientRect: () => {
//                 return { width: 500, height: 800 }
//               }
//             }
//           }
//         }
//       })
//       nockScope = nock('http://localhost:8080')
//         .persist(true)
//         .get('/variableStar.json')
//         .reply(200, variableStar)
//         .get('/nextSubject.txt')
//         .reply(200, nextSubjectJSON)
//     })

//     beforeEach(function () {
//       wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           onReady={onReadySpy}
//           subject={subject}
//         />
//       )
//     })

//     afterEach(function () {
//       onReadySpy.resetHistory()
//     })

//     after(function () {
//       createRefStub.restore()
//       nock.cleanAll()
//       nockScope.persist(false)
//     })

//     it('should set the component state with the json data', function () {
//       expect(wrapper.state().rawJSON).to.deep.equal(variableStar.data)
//     })

//     it('should set the component state with the image location source', function () {
//       expect(getSnapshot(wrapper.state().imageLocation)).to.deep.equal({ 'image/png': 'http://localhost:8080/image1.png' })
//     })

//     it('should update component state when there is a new valid subject', function () {
//       expect(wrapper.state().rawJSON).to.deep.equal(variableStar.data)
//       expect(getSnapshot(wrapper.state().imageLocation)).to.deep.equal({ 'image/png': 'http://localhost:8080/image1.png' })

//       wrapper.setProps({ data: nextSubjectJSON.data, subject: nextSubject })

//       expect(wrapper.state().rawJSON).to.deep.equal(nextSubjectJSON.data)
//       expect(getSnapshot(wrapper.state().imageLocation)).to.deep.equal({ 'image/png': 'http://localhost:8080/image2.png' })
//     })
//   })

//   describe('with series highlighting', function () {
//     let nockScope
//     const highlightedStateMock = [
//       variableStar.data.scatterPlot.data[0].seriesOptions.label,
//       variableStar.data.scatterPlot.data[1].seriesOptions.label
//     ]

//     before(function () {
//       nockScope = nock('http://localhost:8080')
//         .persist(true)
//         .get('/variableStar.json')
//         .reply(200, variableStar)
//         .get('/nextSubject.txt')
//         .reply(200, nextSubjectJSON)
//     })

//     after(function () {
//       nock.cleanAll()
//       nockScope.persist(false)
//     })

//     it('should default to highlighted states of true for each series', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       expect(wrapper.state().highlightedSeries).to.deep.equal(highlightedStateMock)
//     })

//     it('should use the series option label', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       const { highlightedSeries } = wrapper.state()
//       const firstSeriesLabel = highlightedSeries[0]
//       const secondSeriesLabel = highlightedSeries[1]
//       expect(firstSeriesLabel).to.equal(variableStar.data.scatterPlot.data[0].seriesOptions.label)
//       expect(secondSeriesLabel).to.equal(variableStar.data.scatterPlot.data[1].seriesOptions.label)
//     })

//     it('should use a fallback label if series option label is missing', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={nextSubjectJSON.data}
//           subject={nextSubject}
//         />
//       )

//       const { highlightedSeries } = wrapper.state()
//       const firstSeriesLabel = highlightedSeries[0]
//       const secondSeriesLabel = highlightedSeries[1]
//       expect(typeof firstSeriesLabel).to.equal('string')
//       expect(typeof secondSeriesLabel).to.equal('string')
//     })

//     it('should be able to toggle the highlighted state', function () {
//       const eventMock = {
//         target: {
//           checked: false,
//           value: highlightedStateMock[0]
//         }
//       }
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       wrapper.setState({ rawJSON: variableStar.data, highlightedSeries: highlightedStateMock })
//       expect(wrapper.state().highlightedSeries).to.deep.equal(highlightedStateMock)
//       wrapper.instance().setSeriesHighlight(eventMock)
//       expect(wrapper.state().highlightedSeries).to.deep.equal([
//         variableStar.data.scatterPlot.data[1].seriesOptions.label
//       ])
//     })
//   })

//   describe('when calculating the phased scatter plot JSON', function () {
//     let nockScope

//     before(function () {
//       nockScope = nock('http://localhost:8080')
//         .persist(true)
//         .get('/variableStar.json')
//         .reply(200, variableStar)
//         .get('/nextSubject.txt')
//         .reply(200, nextSubjectJSON)
//     })

//     after(function () {
//       nock.cleanAll()
//       nockScope.persist(false)
//     })

//     it('should calculate the phased JSON on initialization', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       const phasedJSONState = wrapper.state().phasedJSON
//       expect(phasedJSONState.data[0].seriesData.length).to.be.at.least(variableStar.data.scatterPlot.data[0].seriesData.length)
//       expect(phasedJSONState.data[0].seriesOptions).to.deep.equal(variableStar.data.scatterPlot.data[0].seriesOptions)
//       expect(phasedJSONState.data[1].seriesData.length).to.be.at.least(variableStar.data.scatterPlot.data[1].seriesData.length)
//       expect(phasedJSONState.data[1].seriesOptions).to.deep.equal(variableStar.data.scatterPlot.data[1].seriesOptions)
//       expect(phasedJSONState.chartOptions).to.deep.equal(variableStar.data.scatterPlot.chartOptions)
//     })

//     it('should calculate the phased JSON for the next subject', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       wrapper.setProps({ data: nextSubjectJSON.data, subject: nextSubject })

//       const phasedJSONState = wrapper.state().phasedJSON
//       expect(phasedJSONState.data[0].seriesData.length).to.be.at.least(nextSubjectJSON.data.scatterPlot.data[0].seriesData.length)
//       expect(phasedJSONState.data[0].seriesOptions).to.deep.equal(nextSubjectJSON.data.scatterPlot.data[0].seriesOptions)
//       expect(phasedJSONState.data[1].seriesData.length).to.be.at.least(nextSubjectJSON.data.scatterPlot.data[1].seriesData.length)
//       expect(phasedJSONState.data[1].seriesOptions).to.deep.equal(nextSubjectJSON.data.scatterPlot.data[1].seriesOptions)
//       expect(phasedJSONState.chartOptions).to.deep.equal(nextSubjectJSON.data.scatterPlot.chartOptions)
//     })

//     it('should calculate a new phased JSON when setPeriodMultiple is called', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       const phasedJSONInitialState = wrapper.state().phasedJSON
//       wrapper.instance().setPeriodMultiple({ target: { value: '2' }})
//       const phasedJSONNewState = wrapper.state().phasedJSON
//       expect(phasedJSONInitialState).to.not.deep.equal(phasedJSONNewState)
//     })

//     it('should calculate a new phased JSON when setSeriesPhaseFocus is called', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       const phasedJSONInitialState = wrapper.state().phasedJSON
//       wrapper.instance().setSeriesPhaseFocus({ target: { value: '1' } })
//       const phasedJSONNewState = wrapper.state().phasedJSON
//       expect(phasedJSONInitialState).to.not.deep.equal(phasedJSONNewState)
//     })
//   })

//   describe('when calculating the phased bar charts JSON', function () {
//     let nockScope

//     before(function () {
//       nockScope = nock('http://localhost:8080')
//         .persist(true)
//         .get('/variableStar.json')
//         .reply(200, variableStar)
//         .get('/nextSubject.txt')
//         .reply(200, nextSubjectJSON)
//     })

//     after(function () {
//       nock.cleanAll()
//       nockScope.persist(false)
//     })


//     it('should calculate the phased bar chart JSON on initialization', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )


//       const phasedBarJSONState = wrapper.state().barJSON
//       expect(phasedBarJSONState.period.data.length).to.be.at.least(variableStar.data.barCharts.period.data.length)
//       expect(phasedBarJSONState.period.chartOptions.xAxisLabel).to.deep.equal(variableStar.data.barCharts.period.chartOptions.xAxisLabel)
//       expect(phasedBarJSONState.period.chartOptions.yAxisLabel).to.deep.equal(variableStar.data.barCharts.period.chartOptions.yAxisLabel)
//       expect(phasedBarJSONState.period.chartOptions.yAxisDomain).to.deep.equal([0, 3])
//       expect(phasedBarJSONState.amplitude.data.length).to.deep.equal(variableStar.data.barCharts.amplitude.data.length)
//       expect(phasedBarJSONState.amplitude.chartOptions).to.deep.equal(variableStar.data.barCharts.amplitude.chartOptions)
//     })

//     it('should calculate the phased bar chart JSON for the next subject', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       wrapper.setProps({ subject: nextSubject })

//       const phasedBarJSONState = wrapper.state().barJSON
//       expect(phasedBarJSONState.period.data.length).to.be.at.least(nextSubjectJSON.data.barCharts.period.data.length)
//       expect(phasedBarJSONState.period.chartOptions).to.deep.equal(nextSubjectJSON.data.barCharts.period.chartOptions)
//       expect(phasedBarJSONState.amplitude.data.length).to.be.at.least(nextSubjectJSON.data.barCharts.amplitude.data.length)
//       expect(phasedBarJSONState.amplitude.chartOptions).to.deep.equal(nextSubjectJSON.data.barCharts.amplitude.chartOptions)
//     })

//     it('should calculate a new phased bar chart JSON when setPeriodMultiple is called', function () {
//       const wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )

//       const phasedBarJSONInitialState = wrapper.state().barJSON
//       wrapper.instance().setPeriodMultiple({ target: { value: '2' } })
//       const phasedBarJSONNewState = wrapper.state().barJSON
//       expect(phasedBarJSONInitialState).to.not.deep.equal(phasedBarJSONNewState)
//       phasedBarJSONNewState.period.data.forEach((datum, index) => {
//         expect(datum.value).to.equal(phasedBarJSONInitialState.period.data[index].value + additiveDictionary['2'])
//       })
//     })
//   })

//   describe('with pan and zoom per scatter plot module', function () {
//     let wrapper
//     before(function () {
//       wrapper = shallow(
//         <VariableStarViewerContainer
//           data={variableStar.data}
//           subject={subject}
//         />
//       )
//     })

//     it('should default to not have pan and zoom enabled for either scatter plot', function () {
//       expect(wrapper.find(VariableStarViewer).props().allowPanZoom).to.equal('')
//     })

//     it('should set the state for which module is allowed to zoom when setAllowPanZoom is called', function () {
//       wrapper.instance().setAllowPanZoom('rawJSON')
//       expect(wrapper.find(VariableStarViewer).props().allowPanZoom).to.equal('rawJSON')
//     })
//   })
// })
