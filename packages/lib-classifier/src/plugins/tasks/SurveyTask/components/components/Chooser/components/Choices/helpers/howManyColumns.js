export default function howManyColumns({ length }) {
  if (length <= 5) {
    return 1
  } else if (length <= 20) {
    return 2
  } else {
    return 3
  }
}