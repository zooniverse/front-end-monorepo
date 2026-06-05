import { useRef } from 'react'
import PropTypes from 'prop-types'

import { useHasMounted } from '@zooniverse/react-components/hooks'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

function SVGCanvas({
  scale = 1,
  children,
  ...props
}) {
  // provider and children should not be rendered until canvas element is available
  // refactored from changes introduced in https://github.com/zooniverse/front-end-monorepo/pull/7223
  const hasMounted = useHasMounted()
  const canvasRef = useRef(null)

  return (
    <g ref={canvasRef} {...props}>
      {hasMounted && (
        <SVGContext.Provider 
          value={{
            canvas: canvasRef.current,
            scale
          }}
        >
          {children}
        </SVGContext.Provider>
      )}
    </g>
  )
}

SVGCanvas.propTypes = {
  scale: PropTypes.number,
  children: PropTypes.element
}

export default SVGCanvas
