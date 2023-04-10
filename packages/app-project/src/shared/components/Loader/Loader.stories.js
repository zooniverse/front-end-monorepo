import Loader from './Loader'
import readme from './README.md'

export default {
  title: 'Project App / Shared / Loader',
  component: Loader,
  args: {
    background: '',
    color: '',
    height: 'xxsmall',
    margin: 'small',
    pad: '',
    width: 'xxsmall'
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default({ background, color, height, margin, pad, width }) {
  return (
    <Loader
      background={background}
      color={color}
      height={height}
      margin={margin}
      pad={pad}
      width={width}
    />
  )
}
