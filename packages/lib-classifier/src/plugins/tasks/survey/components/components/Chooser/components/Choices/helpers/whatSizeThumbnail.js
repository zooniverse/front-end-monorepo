import howManyColumns from './howManyColumns'

export default function whatSizeThumbnail({ length }) {
  switch (howManyColumns({ length })) {
    case 1:
      return 'large'
    case 2:
      return 'large'
    case 3:
      return 'small'
    default:
      return 'none'
  }
}