import zooTheme from '@zooniverse/grommet-theme'
import { Anchor, Box } from 'grommet'
import styled from 'styled-components'
import React from 'react'
import { observable } from 'mobx'
import { Markdownz, Media } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export function Icon({ className, icon }) {
  if (icon && Object.keys(icon).length > 0) {
    return (
      <Media className={className} src={icon.src} />
    )
  }

  return (
    <svg className={className} viewBox='0 0 100 100'>
      <rect fill={zooTheme.global.colors['accent-2']} height='100' width='100' />
    </svg>
  )
}

export function AnchorLabel({ className, icons, item }) {
  const icon = icons.get(item.icon)
  return (
    <Box
      align='center'
      className={className}
      direction='column'
      width='100px'
    >
      <Icon icon={icon} />
      <Markdownz>
        {item.title}
      </Markdownz>
    </Box>
  )
}

function storeMapper(stores) {
  const { attachedMedia: icons, setActiveItem } = stores.classifierStore.fieldGuide
  return {
    icons,
    setActiveItem,
  }
}

@inject(storeMapper)
@observer
class FieldGuideItemAnchor extends React.Component {
  onClick (event, item) {
    const { setActiveItem } = this.props
    event.preventDefault()
    setActiveItem(item)
  }

  render () {
    const { className, icons, row, setActiveItem } = this.props

    return (
      row.map((item) => {
        const label = <AnchorLabel icons={icons} item={item} />
        return (
          <Anchor
            a11yTitle={counterpart('FieldGuideItemAnchor.ariaTitle', { title: item.title })}
            className={className}
            color='dark-5'
            href=''
            key={item.title}
            label={label}
            onClick={(event) => this.onClick(event, item)}
          />
        )
      })
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
  row: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveItem: PropTypes.func.isRequired
}

export default FieldGuideItemAnchor