import { Anchor, Box } from 'grommet'
import React from 'react'
import { observable } from 'mobx'
import { Markdownz } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { withTheme } from 'styled-components'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import { useTranslation } from 'react-i18next'

export function AnchorLabel ({ className, icons, item }) {
  const icon = icons.get(item.icon)
  return (
    <Box
      align='center'
      className={className}
      direction='column'
      width='100px'
    >
      <FieldGuideItemIcon alt={item.title} fit='cover' height='100px' icon={icon} width='100px' />
      <Markdownz>
        {item.title}
      </Markdownz>
    </Box>
  )
}

function FieldGuideItemAnchor (props) {
  const {
    className,
    icons,
    item,
    itemIndex,
    setActiveItemIndex,
    theme
  } = props

  const { t } = useTranslation('components')

  function onClick (event, itemIndex) {
    event.preventDefault()
    setActiveItemIndex(itemIndex)
  }


    const label = <AnchorLabel icons={icons} item={item} />
    const anchorColor = (theme.dark) ? 'light-3' : 'dark-5'
    return (
      <Anchor
        a11yTitle={t('FieldGuide.FieldGuideItemAnchor.ariaTitle', { title: item.title })}
        className={className}
        color={anchorColor}
        href={`#field-guide-item-${itemIndex}`}
        label={label}
        onClick={(event) => onClick(event, itemIndex)}
      />
    )
}

FieldGuideItemAnchor.defaultProps = {
  className: '',
  icons: observable.map(),
  theme: {
    dark: false
  }
}

FieldGuideItemAnchor.propTypes = {
  className: PropTypes.string,
  icons: MobXPropTypes.observableMap,
  item: PropTypes.object.isRequired,
  setActiveItemIndex: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    dark: PropTypes.bool
  })
}

export default withTheme(FieldGuideItemAnchor)
export { FieldGuideItemAnchor }
