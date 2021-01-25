export default function NotFoundError(title) {
  return {
    props: {
      statusCode: 404,
      title
    }
  }
}
