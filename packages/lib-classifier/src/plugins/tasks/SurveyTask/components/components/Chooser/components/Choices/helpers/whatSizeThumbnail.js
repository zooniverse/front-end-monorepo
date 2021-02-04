import howManyColumns from './howManyColumns'

export default function whatSizeThumbnail({ length }) {
  if (length > 30) {
    return 'none'
  }

  switch (howManyColumns({ length })) {
    case 1:
      return 'large'
    case 2:
      return 'medium'
    case 3:
      return 'small'
    default:
      return 'none'
  }
}