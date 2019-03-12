import DefaultLayout from '../../components/DefaultLayout'

const layoutsMap = {
  default: DefaultLayout
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
