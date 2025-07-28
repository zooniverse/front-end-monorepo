import dailyZooPosts from '../Community/dailyZooPosts.mock.json'
import zooBlogPosts from '../Community/zooBlogPosts.mock.json'
import DefaultHome from './DefaultHome'

export default {
  title: 'Home / DefaultHome',
  component: DefaultHome,
  args: {
    dailyZooPosts,
    zooBlogPosts
  }
}

export const Default = {}
