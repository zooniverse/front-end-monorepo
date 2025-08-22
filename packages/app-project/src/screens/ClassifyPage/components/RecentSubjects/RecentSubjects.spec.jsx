import { render, screen } from '@testing-library/react'
import RecentSubjects from './RecentSubjects'

describe('Component > RecentSubjects', function () {
  it('should render without crashing', function () {
    render(<RecentSubjects />)
    expect(screen).toBeTruthy()
  })
})
