import defaultLayout, * as layouts from '../../components'

export default function getLayout(layout) {
  if (layouts[layout]) {
    return layouts[layout]
  } else {
    console.warn(`Couldn't find a layout for '${layout}', falling back to default`)
    return defaultLayout
  }
}
