import { screen, render } from '@testing-library/react'
import { expect } from 'chai'
import zooTheme from '@zooniverse/grommet-theme'
import { Loader } from './Loader'

describe('Component > Loader', function () {
  it('should render without crashing', function () {
    expect(render(<Loader theme={zooTheme} />)).to.be.ok()
  })

  it('should be accessible', function () {
    const { getByLabelText } = render(<Loader a11yTitle='Loading classifier' theme={zooTheme} />)
    const component = getByLabelText('Loading classifier')
    expect(component).to.exist()
    expect(component.getAttribute('role')).to.equal('status')
  })
})