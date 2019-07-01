import getNavLinks from './getNavLinks'

const BASE_URL = '/foo/bar'

describe('Helper > getNavLinks', function () {
  it('should return the menu links for anonymous users', function () {
    const links = getNavLinks(false, BASE_URL)
    expect(links).to.deep.equal([
      {
        href: `${BASE_URL}/about`,
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

  it('should return the menu links for logged-in users', function () {
    const links = getNavLinks(true, BASE_URL)
    expect(links).to.deep.equal([
      {
        href: `${BASE_URL}/about`,
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
