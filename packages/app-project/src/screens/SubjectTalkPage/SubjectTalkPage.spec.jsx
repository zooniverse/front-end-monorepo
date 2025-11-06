import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import SubjectTalkPage from './SubjectTalkPage'

describe('Component > SubjectTalkPage', function () {
  const mockSubject = {
    id: '12345',
    locations: [
      {
        'image/jpeg': 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'
      }
    ]
  }

  const mockStore = {
    organization: {},
    project: {
      about_pages: [],
      avatar: {
        src:
          'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
      },
      background: {
        src:
          'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
      },
      configuration: {
        announcement: ''
      },
      id: '678',
      inBeta: false,
      slug: 'foo/bar',
      strings: {
        display_name: 'Display Name'
      }
    },
    ui: {
      mode: 'light'
    },
    user: {
      isLoggedIn: false,
      personalization: {
        sessionCount: 0
      }
    }
  }

  let routerMock

  before(function () {
    routerMock = {
      asPath: 'projects/foo/bar/talk/subjects/12345',
      push: () => {},
      prefetch: () => new Promise((resolve, reject) => {}),
      query: { owner: 'foo', project: 'bar', subjectID: '12345' }
    }
  })

  describe('SubjectTalkPage', function () {
    it('should show a subject viewer', function () {
      render(
        <RouterContext.Provider value={routerMock}>
          <Provider store={mockStore}>
            <Grommet theme={zooTheme} themeMode='light'>
              <SubjectTalkPage
                projectId='678'
                projectSlug='foo/bar'
                subject={mockSubject}
                subjectId={mockSubject.id}
              />
            </Grommet>
          </Provider>
        </RouterContext.Provider>
      )
      const subjectViewer = screen.getByTestId('viewer')
      expect(subjectViewer).toBeDefined()
    })
  })

  it('should show subject talk data', function () {
    render(
      <RouterContext.Provider value={routerMock}>
        <Provider store={mockStore}>
          <Grommet theme={zooTheme} themeMode='light'>
            <SubjectTalkPage
              projectId='678'
              projectSlug='foo/bar'
              subject={mockSubject}
              subjectId={mockSubject.id}
            />
          </Grommet>
        </Provider>
      </RouterContext.Provider>
    )
    const talkData = screen.getByTestId('talkData')
    expect(talkData).toBeDefined()
  })
})
