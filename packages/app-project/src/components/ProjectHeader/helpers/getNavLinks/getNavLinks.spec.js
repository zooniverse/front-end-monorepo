import getNavLinks from './getNavLinks'

const BASE_URL = '/foo/bar'
const stagingOrigin = 'https://frontend.preview.zooniverse.org'
const productionOrigin = 'https://www.zooniverse.org'

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

  describe('when PANOPTES_ENV is production', function () {
    let previousEnv
    before(function () {
      previousEnv = process.env.PANOPTES_ENV
      process.env.PANOPTES_ENV = 'production'
    })

    after(function () {
      process.env.PANOPTES_ENV = previousEnv
    })
    it('should return the correct menu links', function () {
      const links = getNavLinks(true, BASE_URL, '1234')
      expect(links).to.deep.equal([
        {
          href: `${productionOrigin}${BASE_URL}/about`,
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
