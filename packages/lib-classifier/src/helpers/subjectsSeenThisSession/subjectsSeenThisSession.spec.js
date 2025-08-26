import subjectsSeenThisSession from "."

describe('Helper > subjectsSeenThisSession', function () {
  it('should be an object of functions', function () {
    expect(subjectsSeenThisSession).to.be.an('object')
  })

  describe('add', function () {
    afterEach(function () {
      window.sessionStorage.removeItem("subjectsSeenThisSession")
    })

    it('should be a function', function () {
      expect(subjectsSeenThisSession.add).to.be.a('function')
    })

    it('should only add if the workflow id and subject ids parameters are defined', function () {
      subjectsSeenThisSession.add()
      const seenSubjects = window.sessionStorage.getItem("subjectsSeenThisSession")
      expect(seenSubjects).to.be.null()
    })

    it('should add each subject id with workflow id to the already seen list to session storage', function () {
      subjectsSeenThisSession.add('1234', ['5678', '3333'])
      const seenSubjects = window.sessionStorage.getItem("subjectsSeenThisSession")
      expect(seenSubjects.includes('1234/5678')).to.be.true()
      expect(seenSubjects.includes('1234/3333')).to.be.true()
    })

    it('should only add new ids to the already seen list', function () {
      subjectsSeenThisSession.add('1234', ['5678'])
      let seenSubjects = window.sessionStorage.getItem("subjectsSeenThisSession")
      let parsedSubjects = JSON.parse(seenSubjects)
      expect(parsedSubjects[0]).to.equal('1234/5678')
      expect(parsedSubjects).to.have.lengthOf(1)
      subjectsSeenThisSession.add('1234', ['5678'])
      seenSubjects = window.sessionStorage.getItem("subjectsSeenThisSession")
      parsedSubjects = JSON.parse(seenSubjects)
      expect(parsedSubjects[0]).to.equal('1234/5678')
      expect(parsedSubjects).to.have.lengthOf(1)
    })

    it('should add new ids additively and not overwrite existing already seen ids', function () {
      let seenSubjects = window.sessionStorage.getItem("subjectsSeenThisSession")
      expect(seenSubjects).to.be.null()
      subjectsSeenThisSession.add('1234', ['5678'])
      seenSubjects = window.sessionStorage.getItem("subjectsSeenThisSession")
      let parsedSubjects = JSON.parse(seenSubjects)
      expect(parsedSubjects).to.have.lengthOf(1)
      expect(parsedSubjects[0]).to.equal('1234/5678')
      subjectsSeenThisSession.add('9999', ['7777'])
      seenSubjects = window.sessionStorage.getItem("subjectsSeenThisSession")
      parsedSubjects = JSON.parse(seenSubjects)
      expect(parsedSubjects).to.have.lengthOf(2)
      expect(parsedSubjects[0]).to.equal('1234/5678')
      expect(parsedSubjects[1]).to.equal('9999/7777')
    })
  })

  describe('check', function () {
    afterEach(function () {
      window.sessionStorage.removeItem("subjectsSeenThisSession")
    })

    it('should be a function', function () {
      expect(subjectsSeenThisSession.check).to.be.a('function')
    })

    it('should return false if the workflow and subject id pair is not in the list', function () {
      let seen = subjectsSeenThisSession.check('9999', '7777')
      expect(seen).to.be.false()
      subjectsSeenThisSession.add('1234', ['5678'])
      seen = subjectsSeenThisSession.check('9999', '7777')
      expect(seen).to.be.false()
    })

    it('should return true if teh workflow and subject id pair is in the list', function () {
      let seen = subjectsSeenThisSession.check('1234', '5678')
      expect(seen).to.be.false()
      subjectsSeenThisSession.add('1234', ['5678'])
      seen = subjectsSeenThisSession.check('1234', '5678')
      expect(seen).to.be.true()
    })
  })
})
