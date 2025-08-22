// Old enzyme tests are here for reference, but we no longer use enzyme in this app (Aug '25)
describe.skip('Component > RecentSubjectsContainer', function () {})

// import nock from 'nock'

// import RecentSubjectsContainer from './RecentSubjectsContainer'

// describe('Component > RecentSubjectsContainer', function () {
//   let wrapper
//   const mockStore = {
//     project: {
//       id: '1234',
//       slug: '/test-owner/test-project'
//     }
//   }

//   const TALK_URL = 'https://talk-staging.zooniverse.org'
//   const PANOPTES_URL = 'https://panoptes-staging.zooniverse.org/api'

//   const MOCK_COMMENTS = [
//     { focus_id: '1' },
//     { focus_id: '2' },
//     { focus_id: '3' }
//   ]

//   const MOCK_SUBJECTS = [
//     { id: '1', locations: [] },
//     { id: '2', locations: [] },
//     { id: '3', locations: [] }
//   ]

//   before(function () {
//     nock(TALK_URL)
//       .get('/comments')
//       .query(true)
//       .reply(200, { comments: MOCK_COMMENTS })
//     nock(PANOPTES_URL)
//       .get('/subjects')
//       .query(true)
//       .reply(200, { subjects: MOCK_SUBJECTS })
//     wrapper = shallow(<RecentSubjectsContainer mockStore={mockStore} />)
//   })

//   it('should render without crashing', function () {
//     expect(wrapper).to.be.ok()
//   })
// })
