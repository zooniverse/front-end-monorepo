import { Next, Previous } from 'grommet-icons'

function StyledNext() {
  return (
    <Next
      color='neutral-2'
      size='large'
    />
  )
}

function StyledPrevious() {
  return (
    <Previous
      color='neutral-2'
      size='large'
    />
  )
}

const carouselTheme = {
  carousel: {
    icons: {
      next: StyledNext,
      previous: StyledPrevious
    }
  }
}

export default carouselTheme
