import FavouritesButton from './'
import { FavouritesButtonSubjectMock } from './FavouritesButton.mock'
// import readme from './README.md'

export default {
  title: 'Components/Favourites Button',
  component: FavouritesButton,
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export const NotFavourited = () => (
  <FavouritesButton disabled={false} subject={FavouritesButtonSubjectMock} />
)

export const Favourited = () => (
  <FavouritesButton checked disabled={false} subject={FavouritesButtonSubjectMock} />
)

export const Disabled = () => (
  <FavouritesButton checked={false} disabled subject={FavouritesButtonSubjectMock} />
)
