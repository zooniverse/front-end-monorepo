import { Anchor, Box, Paragraph } from 'grommet'
import React from 'react'
import { observable } from 'mobx'
import PropTypes from 'prop-types'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { withTheme } from 'styled-components'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import { useTranslation } from 'react-i18next'

const defaultIcons = observable.map()
export function AnchorLabel ({
  className = '',
  icons = defaultIcons,
  item,
  title
}) {
  const icon = icons.get(item.icon)
  return (
    <Box
      align='center'
      className={className}
      direction='column'
      width='100px'
    >
      <FieldGuideItemIcon alt={item.title} fit='cover' height='100px' icon={icon} width='100px' />
      <Paragraph>
        {title}
      </Paragraph>
    </Box>
  )
}

const defaultTheme = { dark: false }
function FieldGuideItemAnchor ({
  className = '',
  icons = defaultIcons,
  item,
  itemIndex,
  onClick,
  theme = defaultTheme,
  title
}) {

  const { t } = useTranslation('components')

  function selectItem(event, itemIndex) {
    event.preventDefault()
    onClick(itemIndex)
  }


    const label = <AnchorLabel icons={icons} item={item} title={title} />
    const anchorColor = (theme.dark) ? 'light-3' : 'dark-5'
    return (
      <Anchor
        a11yTitle={t('FieldGuide.FieldGuideItemAnchor.ariaTitle', { title })}
        className={className}
        color={anchorColor}
        href={`#field-guide-item-${itemIndex}`}
        label={label}
        onClick={(event) => selectItem(event, itemIndex)}
      />
    )
}

FieldGuideItemAnchor.propTypes = {
  className: PropTypes.string,
  icons: MobXPropTypes.observableMap,
  item: PropTypes.object.isRequired,
  label: PropTypes.string,
  setActiveItemIndex: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    dark: PropTypes.bool
  })
}

export default withTheme(FieldGuideItemAnchor)
export { FieldGuideItemAnchor }
