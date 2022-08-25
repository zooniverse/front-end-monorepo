import { render, screen } from '@testing-library/react'
import withEnvironments from './'

describe('helpers > withEnvironments', function () {
  function TestComponent({ text }) {
    return <button>{text}</button>
  }

  before(async function () {
    process.env.APP_ENV = 'staging'
  })

  after(function () {
    delete process.env.APP_ENV
  })

  describe('in a matching environment', function () {
    it('should render the wrapped component', function () {
      const ExperimentalFeature = withEnvironments(TestComponent, 'development,staging')
      render(<ExperimentalFeature text='Hello World!' />)
      expect(screen.getByRole('button', { name: 'Hello World!'})).to.exist()
    })
  })

  describe('not in a matching environment', function () {
    it('should not render the wrapped component', function () {
      const ExperimentalFeature = withEnvironments(TestComponent, 'production')
      render(<ExperimentalFeature text='Hello World!' />)
      expect(screen.queryByRole('button', { name: 'Hello World!'})).to.be.null()
    })
  })
})
