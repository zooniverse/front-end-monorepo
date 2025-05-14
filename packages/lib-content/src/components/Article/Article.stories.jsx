import { Box } from 'grommet'
import Article from './Article.jsx'

const mockData = {
  date: '10 YRS AGO',
  excerpt:
    'FOR THE LAST 20 years, scientists have been monitoring and filming areas of the Kosterhavets National Park using Remotely Operated Vehicles. This park contains a highly diverse marine ecosystem which has been under active protection since 2009. Many deep sea bottom dwellers which live here can also be found in the open Atlantic Ocean. That’s because the conditions at the bottom of the fjord here are...',
  imageSrc:
    'https://daily.zooniverse.org/wp-content/uploads/2014/07/51a318cae18f49172b09e1d3_1.jpg',
  title: 'Into the Zooniverse',
  url: 'https://daily.zooniverse.org/2014/07/13/snapshot-sunday-golden-giraffe/'
}

export default {
  title: 'Shared / Article',
  component: Article
}

export const Default = () => {
  return (
    <Box pad='small'>
      <Article {...mockData} />
    </Box>
  )
}
