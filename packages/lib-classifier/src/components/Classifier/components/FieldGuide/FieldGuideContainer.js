import React from 'react'
import PropTypes from 'prop-types'
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
    setModalVisibility(false)
  }

  return (
    <>
      <FieldGuideButton fieldGuide={fieldGuide} onOpen={onOpen} />
      {showModal && 
        <FieldGuide
          activeItemIndex={activeItemIndex}
          fieldGuide={fieldGuide}
          icons={icons}
          onClose={onClose}
          setActiveItemIndex={setActiveItemIndex}
        />
      }
    </>
  )
}

FieldGuideContainer.defaultProps = {
  showModal: false
}

FieldGuideContainer.propTypes = {
  setModalVisibility: PropTypes.func.isRequired,
  showModal: PropTypes.bool
}

export default FieldGuideContainer
