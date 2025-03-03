import howManyColumns from './howManyColumns'

export default function whatSizeThumbnail({ length, thumbnailSetting = 'default' }) {
  if (thumbnailSetting === 'hide') {
    return 'none'
  }

  const columns = howManyColumns({ length })
  
  if (thumbnailSetting === 'show') {
    return columns === 3 ? 'small' : 'large'
  }

  // Default behavior
  
  if (length > 30) {
    return 'none'
  } else if (columns === 3) {
    return 'small'
  }
  return 'large'
}