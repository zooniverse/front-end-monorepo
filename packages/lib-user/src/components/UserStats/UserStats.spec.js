import { render, screen } from '@testing-library/react'
import proxyquire from 'proxyquire'
import sinon from 'sinon'

// TODO: create common mocks in test folder

const TEST_PROJECTS = [
  {
    id: '1',
    display_name: 'Test Project 1',
    description: 'Test project 1 description',
    slug: 'test-owner-1/test-project-1'
  },
  {
    id: '2',
    display_name: 'Test Project 2',
    description: 'Test project 2 description',
    slug: 'test-owner-2/test-project-2'
  }
]

const TEST_STATS = {
  data: [],
  project_contributions: [
    { project_id: 1, count: 75 },
    { project_id: 2, count: 25 }
  ],
  time_spent: 1000,
  total_count: 100
}

const TEST_USER = {
  display_name: 'Test User',
  id: '12345',
  login: 'testuser'
}

describe('components > UserStats', function () {
  let mockAuthClient

  let usePanoptesProjectsStub
  let usePanoptesUserStub
  let useUserStatsStub

  let UserStats

  // happy path
  before(function () {
    mockAuthClient = {
      checkBearerToken: sinon.stub().resolves('fake token'),
      getBearerToken: sinon.stub().resolves('fake token'),
      listen: sinon.stub(),
      stopListening: sinon.stub()
    }

    // Create stubs for the hooks
    usePanoptesProjectsStub = sinon.stub().returns({ data: TEST_PROJECTS, error: null, isLoading: false });
    usePanoptesUserStub = sinon.stub().returns({ data: TEST_USER, error: null, isLoading: false });
    useUserStatsStub = sinon.stub().returns({ data: TEST_STATS, error: null, isLoading: false });

    // Use proxyquire to replace the hooks with the stubs
    UserStats = proxyquire('./UserStats', {
      '../../hooks': {
        usePanoptesProjects: usePanoptesProjectsStub,
        usePanoptesUser: usePanoptesUserStub,
        useUserStats: useUserStatsStub,
      },
    }).default;
  })

  after(function () {
    // Reset the stubs
    usePanoptesProjectsStub.reset();
    usePanoptesUserStub.reset();
    useUserStatsStub.reset();
  })
  
  // tests usePanoptesUser hook
  it('should show the user display name', function () {
    render(<UserStats authClient={mockAuthClient} />)
    
    expect(screen.getByText('Test User')).to.be.ok()
  })

  // test useUserStats hook
  it('should show the user total classifications', function () {
    render(<UserStats authClient={mockAuthClient} />)
    
    expect(screen.getByText('100')).to.be.ok()
  })

  // test usePanoptesProjects hook
  it('should show the user total projects', function () {
    render(<UserStats authClient={mockAuthClient} />)
    
    expect(screen.getByText('2')).to.be.ok()
  })

  // TODO: sad paths (no auth, hook errors, hook loading, etc.)
})
