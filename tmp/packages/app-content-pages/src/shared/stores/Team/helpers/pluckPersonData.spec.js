import { expect } from 'chai'

import pluckPersonData from './pluckPersonData'

const AVATAR_SRC = 'foo'
const BIO = 'bar'
const ID = 'baz'
const JOB_TITLE = 'qux'
const NAME = 'quux'
const TWITTER = 'quuz'

const MOCK_ENTRY = {
  fields: {
    avatar: {
      fields: {
        file: {
          url: AVATAR_SRC
        }
      }
    },
    bio: BIO,
    jobTitle: JOB_TITLE,
    name: NAME,
    twitterID: TWITTER
  },
  sys: {
    id: ID
  }
}

describe('Helpers > pluckPersonData', function () {
  it('should exist', function () {
    expect(pluckPersonData).to.be.a('function')
  })

  it('should get the entry person data', function () {
    const plucked = pluckPersonData(MOCK_ENTRY)
    expect(plucked.avatarSrc).to.equal(AVATAR_SRC)
    expect(plucked.bio).to.equal(BIO)
    expect(plucked.id).to.equal(ID)
    expect(plucked.jobTitle).to.equal(JOB_TITLE)
    expect(plucked.name).to.equal(NAME)
    expect(plucked.twitter).to.equal(TWITTER)
  })
})
