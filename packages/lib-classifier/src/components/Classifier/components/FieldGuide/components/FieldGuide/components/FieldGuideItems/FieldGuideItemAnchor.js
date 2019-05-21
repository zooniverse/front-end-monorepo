import { Anchor, Box } from 'grommet'
import React from 'react'
import { observable } from 'mobx'
import { Markdownz } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { withTheme } from 'styled-components'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

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

function storeMapper (stores) {
  const { attachedMedia: icons, setActiveItemIndex } = stores.classifierStore.fieldGuide
  return {
    icons,
    setActiveItemIndex
  }
}

@inject(storeMapper)
@observer
class FieldGuideItemAnchor extends React.Component {
  onClick (event, itemIndex) {
    const { setActiveItemIndex } = this.props
    event.preventDefault()
    setActiveItemIndex(itemIndex)
  }

  render () {
    const { className, icons, item, itemIndex, theme } = this.props
    const label = <AnchorLabel icons={icons} item={item} />
    const anchorColor = (theme.dark) ? 'light-3' : 'dark-5'
    return (
      <Anchor
        a11yTitle={counterpart('FieldGuideItemAnchor.ariaTitle', { title: item.title })}
        className={className}
        color={anchorColor}
        href={`#field-guide-item-${itemIndex}`}
        label={label}
        onClick={(event) => this.onClick(event, itemIndex)}
      />
    )
  }
}

FieldGuideItemAnchor.wrappedComponent.defaultProps = {
  className: '',
  icons: observable.map(),
  theme: {
    dark: false
  }
}

FieldGuideItemAnchor.wrappedComponent.propTypes = {
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
