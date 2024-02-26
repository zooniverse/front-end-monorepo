import { render, screen } from '@testing-library/react'
import proxyquire from 'proxyquire'
import sinon from 'sinon'

import { PROJECTS, USER } from '../../../test/mocks/panoptes.mock.js'
import { STATS } from '../../../test/mocks/stats.mock.js'

describe('components > UserStats', function () {
  this.timeout(5000)

  let mockAuthClient

  let usePanoptesProjectsStub
  let usePanoptesUserStub
  let useUserStatsStub

  let UserStats

  // happy path
  before(function () {
    mockAuthClient = {
      checkBearerToken: sinon.stub().resolves('fake token'),
      checkCurrent: sinon.stub().resolves(USER),
      getBearerToken: sinon.stub().resolves('fake token'),
      listen: sinon.stub(),
      stopListening: sinon.stub()
    }

    // Create stubs for the hooks
    usePanoptesProjectsStub = sinon.stub().returns({ data: PROJECTS, error: null, isLoading: false });
    usePanoptesUserStub = sinon.stub().returns({ data: USER, error: null, isLoading: false });
    useUserStatsStub = sinon.stub().returns({ data: STATS, error: null, isLoading: false });

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
    
    expect(screen.getByText('1,725')).to.be.ok()
  })

  // test usePanoptesProjects hook
  it('should show the user total projects', function () {
    render(<UserStats authClient={mockAuthClient} />)
    
    expect(screen.getByText('5')).to.be.ok()
  })

  // TODO: sad paths (no auth, hook errors, hook loading, etc.)
})
