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

  const [height, setHeight] = React.useState(415)
  React.useEffect(() => { return onUnmount }, [showModal])

  function onUnmount () {
    setHeight(415)
  }
  function onResize (e, direction, ref, delta, position) {
    if (height !== 'auto') setHeight('auto')
  }


  return (
    <>
      <FieldGuideButton fieldGuide={fieldGuide} onOpen={() => setModalVisibility(true)} />
      {showModal &&
        <ResponsiveContext.Consumer>
          {size => (
            <FieldGuide
              activeItemIndex={activeItemIndex}
              fieldGuide={fieldGuide}
              icons={icons}
              maxHeight={height}
              onClose={() => setModalVisibility(false)}
              onResize={onResize}
              size={size}
              setActiveItemIndex={setActiveItemIndex}
            />
          )}
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
