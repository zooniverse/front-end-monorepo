// Old enzyme tests are here for reference, but we no longer use enzyme in this app (Aug '25)
describe.skip('Component > RecentSubjectsCarousel', function () {})

// import RecentSubjectsCarousel from './RecentSubjectsCarousel'
// import SubjectThumbnail from './components/SubjectThumbnail'

// describe('Component > RecentSubjectsCarousel', function () {
//   let wrapper
//   const subjects = [
//     mockSubject('2'),
//     mockSubject('1'),
//     mockSubject('3')
//   ]
//   function mockSubject (id) {
//     return {
//       id,
//       locations: [
//         { 'image/jpeg': `https://www.zooniverse.org/mock-subjects/file-${id}.jpg` }
//       ]
//     }
//   }

//   before(function () {
//     wrapper = shallow(
//       <RecentSubjectsCarousel
//         href='/projects/test/project/talk'
//         subjects={subjects}
//       />
//     )
//   })

//   it('should render without crashing', function () {
//     expect(wrapper).to.be.ok()
//   })

//   it('should render a thumbnail for each subject', function () {
//     const thumbnails = wrapper.find(SubjectThumbnail)
//     expect(thumbnails.length).to.equal(3)
//   })
// })
