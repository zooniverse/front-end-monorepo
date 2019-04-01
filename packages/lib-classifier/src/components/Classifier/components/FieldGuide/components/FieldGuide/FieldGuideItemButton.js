import zooTheme from '@zooniverse/grommet-theme'
import { Button, Box } from 'grommet'
import styled from 'styled-components'
import React from 'react'
import { observable } from 'mobx'
import { Markdownz, Media } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  &:hover, &:focus {
    background: ${zooTheme.global.colors['accent-2']};
  }
`

function Icon({ className, icon }) {
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

function ButtonLabel({ className, icons, item }) {
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
class FieldGuideItemButton extends React.Component {
  render () {
    const { className, icons, row, setActiveItem } = this.props

    return (
      row.map((item) => {
        const label = <ButtonLabel icons={icons} item={item} />
        return (
          <StyledButton
            a11yTitle={counterpart('FieldGuideItem.ariaTitle', { title: item.title })}
            className={className}
            key={item.title} // Is this secure?
            label={label}
            onClick={() => { setActiveItem(item) }}
            plain
          />
        )
      })
    )
  }
}

FieldGuideItemButton.wrappedComponent.defaultProps = {
  className: '',
  icons: observable.map()
}

FieldGuideItemButton.wrappedComponent.propTypes = {
  className: PropTypes.string,
  icons: MobXPropTypes.observableMap,
  row: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default FieldGuideItemButton