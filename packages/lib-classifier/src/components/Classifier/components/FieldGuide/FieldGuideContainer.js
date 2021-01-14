import React from 'react'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'
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

  function onOpen () {
    setModalVisibility(true)
  }

  function onClose () {
    console.log('calling')
    setModalVisibility(false)
  }

  return (
    <>
      <FieldGuideButton fieldGuide={fieldGuide} onOpen={() => setModalVisibility(true)} />
      {showModal && 
        <FieldGuide
          activeItemIndex={activeItemIndex}
          fieldGuide={fieldGuide}
          icons={icons}
          onClose={() => setModalVisibility(false)}
          setActiveItemIndex={setActiveItemIndex}
        />
      }
    </>
  )
}

FieldGuideContainer.defaultProps = {
  setActiveItemIndex: -1,
  icons: observable.map(),
  showModal: false
}

FieldGuideContainer.propTypes = {
  activeItemIndex: PropTypes.number,
  fieldGuide: PropTypes.object.isRequired,
  icons: MobXPropTypes.observableMap,
  setActiveItemIndex: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  showModal: PropTypes.bool
}

export default FieldGuideContainer
