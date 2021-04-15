import getNavLinks from './getNavLinks'

const BASE_URL = '/foo/bar'

describe('Helper > getNavLinks', function () {
  describe('when not logged in', function () {
    it('should return the correct menu links', function () {
      const links = getNavLinks(false, BASE_URL)
      expect(links).to.deep.equal([
        {
          href: `${BASE_URL}/about/research`,
          text: 'About'
        },
        {
          href: `${BASE_URL}/classify`,
          text: 'Classify'
        },
        {
          href: `${BASE_URL}/talk`,
          text: 'Talk'
        },
        {
          href: `${BASE_URL}/collections`,
          text: 'Collect'
        }
      ])
    })
  })

  describe('when logged in', function () {
    it('should return the correct menu links', function () {
      const links = getNavLinks(true, BASE_URL)
      expect(links).to.deep.equal([
        {
          href: `${BASE_URL}/about/research`,
          text: 'About'
        },
        {
          href: `${BASE_URL}/classify`,
          text: 'Classify'
        },
        {
          href: `${BASE_URL}/talk`,
          text: 'Talk'
        },
        {
          href: `${BASE_URL}/collections`,
          text: 'Collect'
        },
        {
          href: `${BASE_URL}/recents`,
          text: 'Recents'
        }
      ])
    })
  })

  describe('with a default workflow', function () {
    it('should return the correct menu links', function () {
      const links = getNavLinks(true, BASE_URL, '1234')
      expect(links).to.deep.equal([
        {
          href: `${BASE_URL}/about/research`,
          text: 'About'
        },
        {
          href: `${BASE_URL}/classify/workflow/1234`,
          text: 'Classify'
        },
        {
          href: `${BASE_URL}/talk`,
          text: 'Talk'
        },
        {
          href: `${BASE_URL}/collections`,
          text: 'Collect'
        },
        {
          href: `${BASE_URL}/recents`,
          text: 'Recents'
        }
      ])
    })
  })
})
