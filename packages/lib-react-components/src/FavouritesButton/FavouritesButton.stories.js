import FavouritesButton from './'
import readme from './README.md'

const CAT = {
  favorite: false,
  id: '123',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg'
    }
  ]
}

export default {
  title: 'Components/Favourites Button',
  component: FavouritesButton,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => (
  <FavouritesButton disabled={false} subject={CAT} />
)

export const Checked = () => (
  <FavouritesButton checked disabled={false} subject={CAT} />
)

export const Disabled = () => (
  <FavouritesButton checked={false} disabled subject={CAT} />
)
