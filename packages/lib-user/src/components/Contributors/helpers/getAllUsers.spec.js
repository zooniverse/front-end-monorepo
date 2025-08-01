import sinon from 'sinon'
import { panoptes } from '@zooniverse/panoptes-js'

import { getAllUsers } from './getAllUsers'

describe('getAllUsers', function () {
  let panoptesGetStub
  let setExportProgressStub

  beforeEach(function () {
    panoptesGetStub = sinon.stub(panoptes, 'get')
    setExportProgressStub = sinon.stub()
  })

  afterEach(function () {
    sinon.restore()
  })

  it('should return all users when memberIdsPerStats is less than CHUNK_SIZE', async function () {
    const memberIdsPerStats = ['1', '2', '3']
    const users = [{ id: '1' }, { id: '2' }, { id: '3' }]
    panoptesGetStub.resolves({ body: { users } })

    const result = await getAllUsers({ memberIdsPerStats, setExportProgress: setExportProgressStub })

    expect(result).to.deep.equal(users)
    expect(setExportProgressStub.calledOnceWith(100)).toBeTruthy()
  })

  it('should return all users when memberIdsPerStats is more than CHUNK_SIZE', async function () {
    const memberIdsPerStats = Array.from({ length: 201 }, (_, i) => `${i + 1}`)
    const usersChunk1 = Array.from({ length: 200 }, (_, i) => ({ id: `${i + 1}` }))
    const usersChunk2 = [{ id: '201' }]
    panoptesGetStub.onFirstCall().resolves({ body: { users: usersChunk1 }, meta: { users: { next_page: 2 } } })
    panoptesGetStub.onSecondCall().resolves({ body: { users: usersChunk2 } })

    const result = await getAllUsers({ memberIdsPerStats, setExportProgress: setExportProgressStub })

    expect(result).to.deep.equal([...usersChunk1, ...usersChunk2])
    expect(setExportProgressStub.callCount).to.equal(2)
  })
})
