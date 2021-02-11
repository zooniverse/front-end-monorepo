import React from 'react'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { ResponsiveContext } from 'grommet'
import FieldGuideButton from './components/FieldGuideButton'
import FieldGuide from './components/FieldGuide'

function FieldGuideWrapper (props) {
  const {
    fieldGuide,
    setModalVisibility,
    showModal
  } = props

  return (
    <>
      <FieldGuideButton fieldGuide={fieldGuide} onOpen={() => setModalVisibility(true)} />
      {showModal &&
        <ResponsiveContext.Consumer>
          {size => (
            <FieldGuide
              onClose={() => setModalVisibility(false)}
              size={size}
              {...props}
            />
          )}
        </ResponsiveContext.Consumer>
      }
    </>
  )
}

FieldGuideWrapper.defaultProps = {
  activeItemIndex: -1,
  fieldGuide: null,
  icons: observable.map(),
  showModal: false
}

FieldGuideWrapper.propTypes = {
  activeItemIndex: PropTypes.number,
  fieldGuide: PropTypes.object,
  icons: MobXPropTypes.observableMap,
  setActiveItemIndex: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  showModal: PropTypes.bool
}

export default FieldGuideWrapper
