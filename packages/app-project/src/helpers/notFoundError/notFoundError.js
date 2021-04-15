export default function notFoundError(title) {
  return {
    props: {
      statusCode: 404,
      title
    }
  }
}
