import { shallow } from 'enzyme'
import { TranscriptionLine as TranscriptionLineMarkModel } from '../../../../models/marks'
import { TranscriptionLineMark } from './TranscriptionLineMark'

describe('Component > TranscriptionLineMark', function () {
  it('should render without crashing', function () {
    const mark = TranscriptionLineMarkModel.create({
      id: 'line1',
      toolType: 'transcriptionLine',
      x1: 100,
      y1: 200,
      x2: 300,
      y2: 400
    })
    const wrapper = shallow(<TranscriptionLineMark mark={mark} />)
    expect(wrapper).to.be.ok()
  })
})