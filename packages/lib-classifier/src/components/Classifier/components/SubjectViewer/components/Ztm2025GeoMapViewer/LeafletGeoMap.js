import { useEffect, useId } from 'react'

function LeafletGeoMap (props) {
  const leafMapId = useId()
  let leafMap = undefined

  useEffect(function loadMap () {
    

    return function unloadMap () {
    }
  }, [])

  return (
    <div>
      <h6 style={{ margin: '0.25em', padding: 0 }}>LeafletGeoMap</h6>
      <div
        id={leafMapId}
        style={{
          width: '100%',
          height: '400px'
        }}
      ></div>
    </div>
  )
}

export default LeafletGeoMap