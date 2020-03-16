import { ProjectFactory, WorkflowFactory } from '../factories'
import stubPanoptesJs from './'

describe('Tests: stubPanoptesJs', function () {
  let client
  const mockProject = ProjectFactory.build()
  const mockWorkflow = WorkflowFactory.build()
  
  async function parseResponse (url) {
    const response = await client.panoptes.get(url)
    return response.body
  }

  before(function () {
    client = stubPanoptesJs({
      projects: mockProject,
      workflows: [mockWorkflow]
    })
  })
  
  it('should wrap mock resources in arrays', async function () {
    const { projects } = await parseResponse('/projects')
    expect(projects).to.deep.equal([ mockProject ])
  })

  it('should return arrays untouched', async function () {
    const { workflows } = await parseResponse('/workflows')
    expect(workflows).to.deep.equal([ mockWorkflow ])
  })

  it('should return empty arrays by default', async function () {
    const { subjects } = await parseResponse('/subjects')
    expect(subjects).to.deep.equal([])
  })
})