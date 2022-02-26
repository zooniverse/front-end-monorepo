import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import ConnectWithProject from './ConnectWithProject'

const mockUrls = [
  {
    label: '',
    path: 'test-project',
    site: 'bitbucket.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'facebook.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'github.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'instagram.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'medium.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'pinterest.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'plus.google.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'reddit.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'tumblr.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'twitter.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'weibo.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'wordpress.com',
    url: 'www.zooniverse.org'
  },
  {
    label: '',
    path: 'test-project',
    site: 'youtube.com',
    url: 'www.zooniverse.org'
  }
]

const args = {
  dark: false,
  projectName: 'Test Project',
  urls: mockUrls
}

export default {
  title: 'App Project / Shared / ConnectWithProject',
  component: ConnectWithProject,
  args
}

export const Default = ({ dark, projectName, urls }) => {
  const theme = { ...zooTheme, dark }
  return (
    <Grommet
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='12px'>
        <ConnectWithProject projectName={projectName} urls={urls} />
      </Box>
    </Grommet>
  )
}
