import DefaultLayout from '../../components/DefaultLayout'

const layouts = {
  default: DefaultLayout
}

function getLayout (layout) {
  return layouts[layout]
}

export default getLayout
