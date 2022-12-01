import { useState } from 'react';
import PropTypes from 'prop-types'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { ResponsiveContext } from 'grommet'

import { usePanoptesTranslations } from '@hooks'
import FieldGuideButton from './components/FieldGuideButton'
import FieldGuide from './components/FieldGuide'

function FieldGuideWrapper ({
  fieldGuide = null,
  locale,
  ...props
}) {
  const [showModal, setModalVisibility]  = useState(false)
  const translation = usePanoptesTranslations({
    translated_type: 'field_guide',
    translated_id: fieldGuide?.id,
    language: locale
  })
  const strings = translation?.strings

  return (
    <>
      <FieldGuideButton fieldGuide={fieldGuide} onClick={() => setModalVisibility(true)} />
      {showModal &&
        <ResponsiveContext.Consumer>
          {size => (
            <FieldGuide
              fieldGuide={fieldGuide}
              onClose={() => setModalVisibility(false)}
              size={size}
              strings={strings}
              {...props}
            />
          )}
        </ResponsiveContext.Consumer>
      }
    </>
  )
}

FieldGuideWrapper.propTypes = {
  fieldGuide: PropTypes.object,
  icons: MobXPropTypes.observableMap,
  locale: PropTypes.string
}

export default FieldGuideWrapper
