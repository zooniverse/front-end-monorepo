import { shallow } from 'enzyme'
import sinon from 'sinon'

import HeroContainer from './HeroContainer'
import NarrowLayout from './components/NarrowLayout'
import WideLayout from './components/WideLayout'

const WORKFLOWS = [
  {
    id: '1',
    completeness: 0.4,
    default: true,
    displayName: 'Foo',
    grouped: false,
    links: {
      subject_sets: ['1', '2', '3']
    },
    subjectSets: [
      subjectSet('1'),
      subjectSet('2'),
      subjectSet('3')
    ]
  }
]

function subjectSet(id) {
  return {
    id,
    display_name: `test set ${id}`,
    set_member_subjects_count: 10
  }
}

describe('Component > HeroContainer', function () {
  describe('general behaviour', function () {
    let wrapper

    before(function () {
      wrapper = shallow(<HeroContainer workflows={WORKFLOWS} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render the `NarrowLayout` by default', function () {
      expect(wrapper.find(NarrowLayout)).to.have.lengthOf(1)
    })

    it('should render the `WideLayout` with the appropriate prop', function () {
      wrapper.setProps({ isWide: true })
      expect(wrapper.find(WideLayout)).to.have.lengthOf(1)
    })
  })

  describe('workflows', function () {
    let wrapper
    let componentWrapper

    it('should pass down the workflow data', async function () {
      wrapper = shallow(<HeroContainer workflows={WORKFLOWS} />)
      componentWrapper = wrapper.first()
      expect(componentWrapper.prop('workflows')).to.deep.equal({
        loading: 'success',
        data: [
          {
            completeness: 0.4,
            default: true,
            grouped: false,
            id: '1',
            displayName: 'Foo',
            links: {
              subject_sets: ['1', '2', '3']
            },
            subjectSets: [
              subjectSet('1'),
              subjectSet('2'),
              subjectSet('3')
            ]
          }
        ]
      })
    })
  })
})
