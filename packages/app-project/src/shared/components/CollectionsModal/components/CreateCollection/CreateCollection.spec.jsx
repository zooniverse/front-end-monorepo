// Old enzyme tests are here for reference, but we no longer use enzyme in this app (Aug '25)
describe.skip('CollectionsModal > Component > CreateCollection', function () {})

// import { Button, CheckBox, Grommet, TextInput } from 'grommet'
// import zooTheme from '@zooniverse/grommet-theme'
// import sinon from 'sinon'

// import CreateCollection from './CreateCollection'

// describe('CollectionsModal > Component > CreateCollection', function () {
//   let wrapper
//   const collection = { display_name: 'Test One', private: true }
//   const onChange = sinon.stub()
//   const onSubmit = sinon.stub()

//   before(function () {
//     // use mount because we're testing a component that uses refs
//     wrapper = mount(
//       <CreateCollection
//         collection={collection}
//         onChange={onChange}
//         onSubmit={onSubmit}
//       />,
//       { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
//     )
//   })

//   afterEach(function () {
//     onChange.resetHistory()
//   })

//   it('should render without crashing', function () {
//     expect(wrapper).to.be.ok()
//   })

//   it('should call the onSubmit callback on submit', function () {
//     wrapper.find('form').simulate('submit')
//     expect(onSubmit).to.have.been.calledOnce()
//   })

//   describe('collection name input', function () {
//     let textInput

//     before(function () {
//       textInput = wrapper.find(TextInput)
//     })

//     it('should exist', function () {
//       expect(textInput).to.have.lengthOf(1)
//     })

//     it('should display the collection name', function () {
//       expect(textInput.prop('value')).to.equal(collection.display_name)
//     })

//     it('should call the onChange callback', function () {
//       const changeSpy = onChange.withArgs({
//         display_name: 'Test One',
//         private: true
//       })
//       textInput.props().onChange()
//       expect(changeSpy).to.have.been.calledOnce()
//     })
//   })

//   describe('private checkbox', function () {
//     let checkbox

//     before(function () {
//       checkbox = wrapper.find(CheckBox)
//     })

//     it('should exist', function () {
//       expect(checkbox).to.have.lengthOf(1)
//     })

//     it('should show the collection private status', function () {
//       expect(checkbox.prop('checked')).to.equal(collection.private)
//     })

//     it('should call the onChange callback', function () {
//       const changeSpy = onChange.withArgs({
//         display_name: 'Test One',
//         private: true
//       })
//       checkbox.props().onChange()
//       expect(changeSpy).to.have.been.calledOnce()
//     })
//   })

//   describe('Add button', function () {
//     let button

//     before(function () {
//       button = wrapper.find(Button)
//     })

//     it('should exist', function () {
//       expect(button).to.have.lengthOf(1)
//     })

//     it('should submit the form', function () {
//       expect(button.props().type).to.equal('submit')
//     })

//     it('can be disabled', function () {
//       wrapper.setProps({ disabled: true })
//       button = wrapper.find(Button)
//       expect(button.prop('disabled')).to.be.true()
//     })
//   })
// })
