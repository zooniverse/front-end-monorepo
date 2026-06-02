import { useContext } from 'react'

import SVGContext from '../shared/SVGContext'

function useSVGContext() {
    return useContext(SVGContext)
}

export default useSVGContext
