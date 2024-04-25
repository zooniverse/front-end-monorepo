export const NavLinkCurrentPageMock = {
  asPath: '/projects/foo/bar/baz',
  pathname: '/projects/[project]/[owner]/baz',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

export const NavLinkOtherPageMock = {
  asPath: '/foo/bar/bing',
  pathname: '/[project]/[owner]/bing',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}

export const NavLinkMock = {
  href: '/foo/bar/baz',
  text: 'Foobar'
}
