/* eslint
  func-names: 0,
  import/no-extraneous-dependencies: ["error", { "devDependencies": true }]
  prefer-arrow-callback: 0,
  "react/jsx-boolean-value": ["error", "always"]
*/

import { render, screen } from '@testing-library/react'
import TaskInputLabel from './TaskInputLabel'

const label = 'test label'

describe('TaskInputLabel', function () {
  it('should render without crashing', function () {
    render(<TaskInputLabel />)
  })

  it('should use props.label as the innerHTML text', function () {
    render(<TaskInputLabel label={label} />)
    expect(screen.getByText(label)).to.exist
  })

  it('should not render props.labelIcon if not defined', function () {
    render(<TaskInputLabel label={label} />)
    expect(document.querySelector('span#icon')).to.equal(null)
  })

  it('should not render props.labelStatus if not defined', function () {
    render(<TaskInputLabel label={label} />)
    expect(document.querySelector('span#status')).to.equal(null)
  })

  it('should render props.labelIcon if defined', function () {
    render(<TaskInputLabel label={label} labelIcon={<span id='icon' />} />)
    expect(document.querySelectorAll('span#icon')).to.have.lengthOf(1)
  })

  it('should render props.labelStatus if defined', function () {
    render(<TaskInputLabel label={label} labelStatus={<span id='status' />} />)
    expect(document.querySelectorAll('span#status')).to.have.lengthOf(1)
  })
})
