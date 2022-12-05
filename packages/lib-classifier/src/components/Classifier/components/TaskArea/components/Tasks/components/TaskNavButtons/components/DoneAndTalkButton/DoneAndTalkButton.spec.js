import { shallow } from 'enzyme'
import sinon from 'sinon'

import DoneAndTalkButton from './DoneAndTalkButton'

describe('DoneAndTalkButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DoneAndTalkButton visible />)
    expect(wrapper).to.be.ok()
  })

  it('should call props.onClick for the onClick event', function () {
    const onClickSpy = sinon.stub().callsFake(() => { return Promise.resolve() })
    const wrapper = shallow(<DoneAndTalkButton visible onClick={onClickSpy} />)
    wrapper.simulate('click', { event: { metaKey: false } })
    expect(onClickSpy).to.have.been.calledOnce()
  })
})
