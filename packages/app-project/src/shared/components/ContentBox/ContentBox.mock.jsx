export const ContentBoxMock = {
  title: 'Test Title',
  linkLabel: 'Test Label',
  linkProps: {
    href: 'https://www.zooniverse.org/projects/zooniverse/serengeti'
  },
  contentText: `Test content text...`
}

ContentBoxMock.content = (<div>{ContentBoxMock.contentText}</div>)
