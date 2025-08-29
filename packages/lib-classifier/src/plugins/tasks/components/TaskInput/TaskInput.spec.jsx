import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import sinon from 'sinon'

import TaskInput from './TaskInput'

describe('TaskInput', function () {
  function withGrommet() {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          {children}
        </Grommet>
      )
    }
  }

  describe('render', function () {
    it('should render a radio button', function () {
      render(
        <TaskInput index={0} type='radio' />,
        { wrapper: withGrommet()}
      )
      expect(document.querySelectorAll('input[type="radio"]')).to.have.lengthOf(1)
    })

    it('should render a label', function () {
      render(
        <TaskInput index={0} type='radio' />,
        { wrapper: withGrommet()}
      )
      expect(document.querySelectorAll('label')).to.have.lengthOf(1)
    })

    it('should pass props.className to the label', function () {
      render(
        <TaskInput className='active' index={0} type='radio' />,
        { wrapper: withGrommet()}
      )
      expect(document.querySelector('label').className).to.include('active')
    })

    it('should disable the form input when disabled', function () {
      render(
        <TaskInput disabled index={0} type='radio' />,
        { wrapper: withGrommet()}
      )
      const radioButton = document.querySelector('input[type="radio"]')
      expect(radioButton.disabled).to.equal(true)
    })
  })

  describe('onChange method', function () {
    const onChangeSpy = sinon.spy()

    beforeEach(function () {
      render(
        <TaskInput onChange={onChangeSpy} index={0} type='radio' />,
        { wrapper: withGrommet()}
      )
    })

    afterEach(function () {
      onChangeSpy.resetHistory()
    })

    it('should call onChange when the on change event is fired', async function () {
      const user = userEvent.setup()
      const radioButton = document.querySelector('input[type="radio"]')
      await user.click(radioButton)
      expect(onChangeSpy).to.have.been.calledOnce()
    })
  })
})
