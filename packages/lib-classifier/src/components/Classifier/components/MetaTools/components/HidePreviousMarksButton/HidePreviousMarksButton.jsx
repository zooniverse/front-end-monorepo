import { MetaToolsButton } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { FormView, FormViewHide } from 'grommet-icons'
import { useTranslation } from '@translations/i18n'

import SHOWN_MARKS from '@helpers/shownMarks'

const DEFAULT_HANDLER = () => false

export default function HidePreviousMarksButton ({
  disabled = false,
  onClick = DEFAULT_HANDLER,
  shownMarks = SHOWN_MARKS.ALL
}) {
  const { t } = useTranslation('components')
  const text = shownMarks === SHOWN_MARKS.ALL ?
    t('MetaTools.HidePreviousMarksDrawingButton.hide') :
    t('MetaTools.HidePreviousMarksDrawingButton.show')

  const icon = shownMarks === SHOWN_MARKS.ALL ? <FormView /> : <FormViewHide />

  return (
    <MetaToolsButton
      aria-checked={shownMarks === SHOWN_MARKS.NONE}
      disabled={disabled}
      icon={icon}
      role='checkbox'
      text={text}
      onClick={onClick}
    />
  )
}

HidePreviousMarksButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  shownMarks: PropTypes.string
}
