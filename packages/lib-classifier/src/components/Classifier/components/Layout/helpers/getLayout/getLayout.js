import DefaultLayout from '../../components/DefaultLayout'
import MaxWidth from '../../components/MaxWidth'

const layoutsMap = {
  default: DefaultLayout,
  maxWidth: MaxWidth
}

function getLayout (layout) {
  if (layoutsMap[layout]) {
    return layoutsMap[layout]
  } else {
    console.warn(`Couldn't find a layout for '${layout}', falling back to default`)
    return layoutsMap.default
  }
}

export default getLayout
