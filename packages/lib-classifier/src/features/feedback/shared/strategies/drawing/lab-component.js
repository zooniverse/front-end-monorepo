import PropTypes from 'prop-types'
import React from 'react'
import counterpart from 'counterpart'
import TextInput from '../../components/text-input'
import CheckboxInput from '../../components/checkbox-input'

/* eslint-disable max-len */
counterpart.registerTranslations('en', {
  StrategyOptions: {
    fields: {
      defaultTolerance: {
        title: 'Default Tolerance',
        help: 'Can be overriden by subject metadata.'
      },
      hideSubjectViewer: {
        title: 'Hide Subject Viewer',
        help: 'By default, the Subject Viewer is shown when a user receives feedback. Check this box to hide it.'
      }
    }
  }
})
/* eslint-enable max-len */

// Provide a shortcut for input translation text
function fieldText (selector) {
  return counterpart(`StrategyOptions.fields.${selector}`)
}

function LabComponent ({ formState, handleInputChange }) {
  return (
    <div>
      <TextInput
        title={fieldText('defaultTolerance.title')}
        help={fieldText('defaultTolerance.help')}
        name='defaultTolerance'
        value={formState.defaultTolerance}
        onChange={handleInputChange.bind(this)}
        type='number'
        required
      />

      <CheckboxInput
        title={fieldText('hideSubjectViewer.title')}
        help={fieldText('hideSubjectViewer.help')}
        name='hideSubjectViewer'
        checked={formState.hideSubjectViewer}
        onChange={handleInputChange.bind(this)}
      />
    </div>
  )
}

LabComponent.propTypes = {
  formState: PropTypes.shape({
    defaultTolerance: PropTypes.string,
    hideSubjectViewer: PropTypes.bool
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired
}

export default LabComponent
