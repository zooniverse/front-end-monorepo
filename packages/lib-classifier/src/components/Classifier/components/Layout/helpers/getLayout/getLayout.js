import defaultLayout, * as layouts from '../../components'

export default function getLayout(layout) {
  if (layouts[layout]) {
    return layouts[layout]
  } else {
    return defaultLayout
  }
}
