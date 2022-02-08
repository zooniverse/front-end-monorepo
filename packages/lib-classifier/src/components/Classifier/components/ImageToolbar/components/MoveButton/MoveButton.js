import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import MoveIcon from './MoveIcon'
import Button from '../Button'

function MoveButton ({ active, onClick }) {
  const { t } = useTranslation('components')
  return (
    <Button
      a11yTitle={t('ImageToolbar.MoveButton.ariaLabel')}
      active={active}
      icon={<MoveIcon />}
      onClick={onClick}
    />
  )
}

MoveButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
}

MoveButton.defaultProps = {
  active: false,
  onClick: () => console.log('Move Button')
}

export default MoveButton
