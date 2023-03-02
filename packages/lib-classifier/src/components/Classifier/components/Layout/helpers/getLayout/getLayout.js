import { MaxWidth, NoMaxWidth } from '../../components/'

const layoutsMap = {
  default: MaxWidth,
  maxWidth: MaxWidth,
  noMaxWidth: NoMaxWidth
}

export default function getLayout(layout) {
  if (layoutsMap[layout]) {
    return layoutsMap[layout]
  } else {
    console.warn(`Couldn't find a layout for '${layout}', falling back to default`)
    return layoutsMap.default
  }
}
