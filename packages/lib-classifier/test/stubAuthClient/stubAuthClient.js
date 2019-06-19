import sinon from 'sinon'

export default function stubAuthClient (user = null, token = null) {
  if (user && token) {
    return {
     checkCurrent: sinon.stub().callsFake(() => Promise.resolve(user)),
     checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(token))
    }
  }

  return {
    checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null)),
    checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null))
  }
}