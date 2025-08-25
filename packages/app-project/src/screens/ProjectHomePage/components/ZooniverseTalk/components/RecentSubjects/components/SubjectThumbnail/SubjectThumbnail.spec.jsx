// Old enzyme tests are here for reference, but we no longer use enzyme in this app (Aug '25)

describe.skip('Component > SubjectThumbnail', function () {})

// import { Media } from '@zooniverse/react-components'

// import SubjectThumbnail, { StyledAnchor } from './SubjectThumbnail'

// describe('Component > SubjectThumbnail', function () {
//   let wrapper
//   const href = '/projects/test/project/talk'

//   function mockSubject (id) {
//     return {
//       id,
//       locations: [
//         { 'image/jpeg': `https://www.zooniverse.org/mock-subjects/file-${id}.jpg` }
//       ]
//     }
//   }

//   before(function () {
//     wrapper = shallow(<SubjectThumbnail height={200} href={href} width={270} subject={mockSubject('1')} />)
//   })

//   it('should render without crashing', function () {
//     expect(wrapper).to.be.ok()
//   })

//   it('should render a linked thumbnail', function () {
//     const link = wrapper.find(StyledAnchor)
//     const href = '/projects/test/project/talk/subjects/1'
//     const src = 'https://www.zooniverse.org/mock-subjects/file-1.jpg'
//     const media = link.find(Media)
//     expect(link.prop('href')).to.equal(href)
//     expect(media.prop('src')).to.equal(src)
//   })

//   it('should have a max height', function () {
//     const container = wrapper.find(StyledAnchor).children().first()
//     expect(container.prop('maxHeight')).to.equal(200)
//   })

//   it('should have a max width', function () {
//     const container = wrapper.find(StyledAnchor).children().first()
//     expect(container.prop('maxWidth')).to.equal(270)
//   })
// })
