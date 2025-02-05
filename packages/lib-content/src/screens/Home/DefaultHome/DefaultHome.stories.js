import dailyZooPosts from '../Community/dailyZooPosts.mock.json'
import zooBlogPosts from '../Community/zooBlogPosts.mock.json'
import DefaultHome from './DefaultHome.js'

export default {
  title: 'Home / DefaultHome',
  component: DefaultHome,
  args: {
    dailyZooPosts,
    zooBlogPosts
  }
}

export const Default = {}
