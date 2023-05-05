import { useKeyZoom } from '@hooks'

function withKeyZoom (WrappedComponent) {

  function KeyZoom(props) {
    const { onKeyZoom } = useKeyZoom()
    return (
      <WrappedComponent
        onKeyDown={onKeyZoom}
        {...props}
      />
    )
  }

  const name = WrappedComponent.displayName || WrappedComponent.name
  KeyZoom.displayName = `withKeyZoom(${name})`
  KeyZoom.wrappedComponent = WrappedComponent

  return KeyZoom
}

export default withKeyZoom
