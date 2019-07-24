import getNavLinks from './getNavLinks'

const PARAMS = {
  owner: 'Foo',
  project: 'Bar'
}

describe('Helper > getNavLinks', function () {
  it('should return the menu links for anonymous users', function () {
    const links = getNavLinks(false, PARAMS)
    expect(links).to.deep.equal([
      {
        as: '/projects/Foo/Bar/about',
        href: {
          pathname: '/about/index',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'About'
      },
      {
        as: '/projects/Foo/Bar/classify',
        href: {
          pathname: '/classify',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'Classify'
      },
      {
        as: '/projects/Foo/Bar/talk',
        href: {
          pathname: '/talk',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'Talk'
      },
      {
        as: '/projects/Foo/Bar/collections',
        href: {
          pathname: '/collections',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'Collect'
      }
    ])
  })

  it('should return the menu links for logged-in users', function () {
    const links = getNavLinks(true, PARAMS)
    expect(links).to.deep.equal([
      {
        as: '/projects/Foo/Bar/about',
        href: {
          pathname: '/about/index',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'About'
      },
      {
        as: '/projects/Foo/Bar/classify',
        href: {
          pathname: '/classify',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'Classify'
      },
      {
        as: '/projects/Foo/Bar/talk',
        href: {
          pathname: '/talk',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'Talk'
      },
      {
        as: '/projects/Foo/Bar/collections',
        href: {
          pathname: '/collections',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'Collect'
      },
      {
        as: '/projects/Foo/Bar/recents',
        href: {
          pathname: '/recents',
          query: {
            owner: 'Foo',
            project: 'Bar'
          }
        },
        text: 'Recents'
      }
    ])
  })
})
