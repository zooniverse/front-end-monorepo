import React from 'react'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { ResponsiveContext } from 'grommet'
import FieldGuideButton from './components/FieldGuideButton'
import FieldGuide from './components/FieldGuide'

function FieldGuideContainer (props) {
  const {
    activeItemIndex,
    fieldGuide,
    icons,
    setActiveItemIndex,
    setModalVisibility,
    showModal
  } = props

  return (
    <>
      <FieldGuideButton fieldGuide={fieldGuide} onOpen={() => setModalVisibility(true)} />
      {showModal &&
        <ResponsiveContext.Consumer>
          {size => {
            <FieldGuide
              activeItemIndex={activeItemIndex}
              fieldGuide={fieldGuide}
              icons={icons}
              onClose={() => setModalVisibility(false)}
              size={size}
              setActiveItemIndex={setActiveItemIndex}
            />
          }}
        </ResponsiveContext.Consumer>
      }
    </>
  )
}

FieldGuideContainer.defaultProps = {
  fieldGuide: null,
  icons: observable.map(),
  setActiveItemIndex: -1,
  showModal: false
}

FieldGuideContainer.propTypes = {
  activeItemIndex: PropTypes.number,
  fieldGuide: PropTypes.object,
  icons: MobXPropTypes.observableMap,
  setActiveItemIndex: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  showModal: PropTypes.bool
}

export default FieldGuideContainer
