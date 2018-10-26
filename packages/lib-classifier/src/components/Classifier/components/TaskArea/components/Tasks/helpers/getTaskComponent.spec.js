import getTaskComponent from './getTaskComponent'

import SingleChoiceTask from '../components/SingleChoiceTask'

describe('Helpers > getTaskComponent', function () {
  it('should return the `SingleChoiceTask` component if passed `single`', function () {
    expect(getTaskComponent('single')).to.equal(SingleChoiceTask)
  })

  it('should return null if it can\'t match a task component', function () {
    expect(getTaskComponent('foobar')).to.equal(null)
  })
})
