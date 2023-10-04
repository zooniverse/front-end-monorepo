export const NavLinkCurrentPageMock = {
  asPath: '/projects/foo/bar/baz',
  pathname: '/projects/[project]/[owner]/baz',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

export const NavLinkOtherPageMock = {
  asPath: '/projects/foo/bar/bing',
  pathname: '/projects/[project]/[owner]/bing',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

export const NavLinkMock = {
  href: '/projects/foo/bar/baz',
  text: 'Foobar'
}
