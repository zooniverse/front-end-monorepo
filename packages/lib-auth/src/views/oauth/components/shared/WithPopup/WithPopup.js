import React from 'react'

import Popup from '../Popup'

function WithPopup (WrappedComponent) {
  return function HOC (props) {
    return (
      <Popup {...props}>
        <WrappedComponent {...props} />
      </Popup>
    )
  }
}

export default WithPopup
