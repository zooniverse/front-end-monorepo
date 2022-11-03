import { useProgressiveImage } from '@zooniverse/react-components'

// Use this instead of https://www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png to save on network calls
export const PLACEHOLDER_URL = 'https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png'

export default function useSubjectImage(src) {
  return useProgressiveImage({
    placeholderSrc: PLACEHOLDER_URL,
    src
  })
}
