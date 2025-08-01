import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import Projects from './Projects'
import { PAGE_SIZE } from '../AllProjectsByCount/AllProjectsByCount'
import { PROJECTS, PROJECT_CONTRIBUTIONS } from '../AllProjects.mocks.js'

describe('components > shared > AllProjects', function () {
  describe('when there are projectContributions', function () {
    let oldEvent
    // Grommet's Pagination component is creating a `new Event()` out of our control.
    // For this test suite, set global.Event to window.Event to prevent this error:
    // Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.
    // https://github.com/jsdom/jsdom/issues/3331#issuecomment-1137376839
    before(function () {
      oldEvent = global.Event
      global.Event = window.Event
    })

    after(function () {
      global.Event = oldEvent
    })

    // Must wrap with Grommet provider because Pagination looks for icons via theme.pagination.icons.next or ...previous
    // https://github.com/grommet/grommet/blob/master/src/js/components/Pagination/Pagination.jsx
    it('should show max PAGE_SIZE projects on first page', function () {
      render(
        <Grommet theme={zooTheme}>
          <Projects
            numProjects={PROJECT_CONTRIBUTIONS.length}
            page={1}
            pageSize={PAGE_SIZE}
            renderedProjects={PROJECTS.slice(0, PAGE_SIZE)}
          />
        </Grommet>
      )
      const cards = screen.getAllByRole('link')
      expect(cards.length).to.equal(PAGE_SIZE)
    })
  })

  describe('when there are no projectContributions', function () {
    it('should show the `no projects` message', function () {
      render(<Projects renderedProjects={[]} />)
      expect(screen.getByText('No projects found')).toBeTruthy()
    })
  })

  describe('when there is a container error', function () {
    it('should show the `error` message', function () {
      render(
        <Projects
          renderedProjects={[]}
          error={{ status: 500, message: 'This is a mock error' }}
        />
      )
      expect(screen.getByText('There was an error')).toBeTruthy()
    })
  })
})
