import { MaxWidth, MultiFrame, NoMaxWidth } from '../../components/'

const layoutsMap = {
  default: MaxWidth,
  maxWidth: MaxWidth,
  noMaxWidth: NoMaxWidth,
  multiFrame: MultiFrame
}

export default function getLayout (layout) {
  if (layoutsMap[layout]) {
    return layoutsMap[layout]
  } else {
    console.warn(`Couldn't find a layout for '${layout}', falling back to default`)
    return layoutsMap.default
  }
}
