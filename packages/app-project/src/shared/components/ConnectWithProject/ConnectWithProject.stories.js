import { Box } from 'grommet'
import ConnectWithProject from './ConnectWithProject'

const mockUrls = [
  {
    label: '',
    path: 'test-project',
    site: 'bitbucket.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'facebook.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'github.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'instagram.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'medium.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'pinterest.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'plus.google.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'reddit.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'tumblr.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'twitter.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'weibo.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'wordpress.com'
  },
  {
    label: '',
    path: 'test-project',
    site: 'youtube.com'
  }
]

const args = {
  projectName: 'Test Project',
  urls: mockUrls
}

export default {
  title: 'Project App / Shared / ConnectWithProject',
  component: ConnectWithProject,
  args
}

export const Default = ({ projectName, urls }) => {
  return (
    <Box pad='xsmall'>
      <ConnectWithProject projectName={projectName} urls={urls} />
    </Box>
  )
}
