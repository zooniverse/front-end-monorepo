import { arrayOf, bool, shape, string } from 'prop-types'

import WideLayout from './components/WideLayout'
import NarrowLayout from './components/NarrowLayout'

/**
  The hero panel on the project home page. Contains a project image, a brief introduction to the project and links to get started with classifications.
*/
function Hero ({
  isWide = false,
  workflows = []
}) {
  return isWide
    ? <WideLayout workflows={workflows} />
    : <NarrowLayout workflows={workflows} />
}

Hero.propTypes = {
  /** SSR flag to render either the wide or narrow screen layout. */
  isWide: bool,
  /** An array of workflows for the workflow menu. */
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default Hero
