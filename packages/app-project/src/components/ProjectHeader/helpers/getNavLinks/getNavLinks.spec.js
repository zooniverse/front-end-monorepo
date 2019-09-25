import getNavLinks from './getNavLinks'

const BASE_URL = '/foo/bar'

describe('Helper > getNavLinks', function () {
  describe('when not logged in', function () {
    it('should return the correct menu links', function () {
      const links = getNavLinks(false, BASE_URL)
      expect(links).to.deep.equal([
        {
          as: `${BASE_URL}/about`,
          href: '/projects/[owner]/[project]/about',
          text: 'About'
        },
        {
          as: `${BASE_URL}/classify`,
          href: '/projects/[owner]/[project]/classify',
          text: 'Classify'
        },
        {
          as: `${BASE_URL}/talk`,
          href: '/projects/[owner]/[project]/talk',
          text: 'Talk'
        },
        {
          as: `${BASE_URL}/collections`,
          href: '/projects/[owner]/[project]/collections',
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
          as: `${BASE_URL}/about`,
          href: '/projects/[owner]/[project]/about',
          text: 'About'
        },
        {
          as: `${BASE_URL}/classify`,
          href: '/projects/[owner]/[project]/classify',
          text: 'Classify'
        },
        {
          as: `${BASE_URL}/talk`,
          href: '/projects/[owner]/[project]/talk',
          text: 'Talk'
        },
        {
          as: `${BASE_URL}/collections`,
          href: '/projects/[owner]/[project]/collections',
          text: 'Collect'
        },
        {
          as: `${BASE_URL}/recents`,
          href: '/projects/[owner]/[project]/recents',
          text: 'Recents'
        }
      ])
    })
  })
})
