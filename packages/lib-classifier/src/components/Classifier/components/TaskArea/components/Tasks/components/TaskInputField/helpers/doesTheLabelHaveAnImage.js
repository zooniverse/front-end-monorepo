export default function doesTheLabelHaveAnImage (label) {
  const imageRegex = /(?:!\[(.*?)\]\((.*?)\))/g
  return label && imageRegex.test(label)
}
