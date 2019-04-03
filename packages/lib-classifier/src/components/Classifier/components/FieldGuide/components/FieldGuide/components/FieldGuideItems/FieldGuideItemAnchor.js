import { Anchor, Box } from 'grommet'
import React from 'react'
import { observable } from 'mobx'
import { Markdownz } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export function AnchorLabel({ className, icons, item }) {
  const icon = icons.get(item.icon)
  return (
    <Box
      align='center'
      className={className}
      direction='column'
      width='100px'
    >
      <FieldGuideItemIcon alt={item.title} height='100' icon={icon} width='100' />
      <Markdownz>
        {item.title}
      </Markdownz>
    </Box>
  )
}

function storeMapper(stores) {
  const { attachedMedia: icons, setActiveItemIndex } = stores.classifierStore.fieldGuide
  return {
    icons,
    setActiveItemIndex,
  }
}

@inject(storeMapper)
@observer
class FieldGuideItemAnchor extends React.Component {
  onClick (event, item) {
    const { setActiveItemIndex } = this.props
    event.preventDefault()
    setActiveItemIndex(item)
  }

  render () {
    const { className, icons, item } = this.props
    const label = <AnchorLabel icons={icons} item={item} />

    return (
      <Anchor
        a11yTitle={counterpart('FieldGuideItemAnchor.ariaTitle', { title: item.title })}
        className={className}
        color='dark-5'
        href=''
        label={label}
        onClick={(event) => this.onClick(event, item)}
      />
    )
  }
}

FieldGuideItemAnchor.wrappedComponent.defaultProps = {
  className: '',
  icons: observable.map()
}

FieldGuideItemAnchor.wrappedComponent.propTypes = {
  className: PropTypes.string,
  icons: MobXPropTypes.observableMap,
  item: PropTypes.object.isRequired,
  setActiveItemIndex: PropTypes.func.isRequired
}

export default FieldGuideItemAnchor