// Old enzyme tests are here for reference, but we no longer use enzyme in this app (Aug '25)
describe.skip('Component > ErrorMessage', function () {})

// import ErrorMessage from './ErrorMessage'

// let wrapper

// const ERROR_WITHOUT_STACK = {
//   message: 'There was some kind of error!',
//   name: 'FoobarError'
// }

// const ERROR_WITH_STACK = {
//   ...ERROR_WITHOUT_STACK,
//   stack: 'Foobar foobar foobar foobar foobar foobar foobar foobar.'
// }

// describe('Component > ErrorMessage', function () {
//   before(function () {
//     wrapper = shallow(<ErrorMessage error={ERROR_WITH_STACK} />)
//   })

//   it('should render without crashing', function () {
//     expect(wrapper).to.be.ok()
//   })

//   it('should show the error name and message', function () {
//     const wrapper = shallow(<ErrorMessage error={ERROR_WITH_STACK} />)
//     const text = wrapper.find('Text').render().text()
//     expect(text).to.equal(`${ERROR_WITH_STACK.name}: ${ERROR_WITH_STACK.message}`)
//   })
// })
