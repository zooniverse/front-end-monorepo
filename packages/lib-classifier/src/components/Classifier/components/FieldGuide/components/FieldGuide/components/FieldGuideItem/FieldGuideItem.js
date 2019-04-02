import { Button, Box } from 'grommet'
import { FormPrevious } from 'grommet-icons'
import styled from 'styled-components'
import React from 'react'
import { Markdownz, Media } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const FieldGuideItemHeader = styled(Box)`
  > h3 {
    margin: 0;
  }
`

function storeMapper(stores) {
  const { setActiveItem, attachedMedia: icons } = stores.classifierStore.fieldGuide
  return {
    icons,
    setActiveItem
  }
}

@inject(storeMapper)
@observer
class FieldGuideItem extends React.Component {
  render () {
    const { className, icons, item, setActiveItem } = this.props
    const icon = icons.get(item.icon)

    return (
      <Box className={className}>
        <FieldGuideItemHeader align='center' direction='row'>
          <Button
            a11yTitle={counterpart("FieldGuideItem.ariaTitle")}
            icon={<FormPrevious />}
            onClick={() => setActiveItem()}
            plain
          />
          <Markdownz>
            {`### ${item.title}`}
          </Markdownz>
        </FieldGuideItemHeader>
        <Box direction='column'>
          {icon && Object.keys(icon).length > 0 &&
            <Media fit='contain' height={140} src={icon.src} />}
          <Markdownz>
            {item.content}
          </Markdownz>
        </Box>
      </Box>
    )
  }
}

FieldGuideItem.wrappedComponent.defaultProps = {
  className: '',
  icons: observable.map()
}

FieldGuideItem.wrappedComponent.propTypes = {
  className: PropTypes.string,
  icons: MobXPropTypes.observableMap,
  item: PropTypes.object.isRequired,
  setActiveItem: PropTypes.func.isRequired
}

export default FieldGuideItem