import { Button, Box } from 'grommet'
import { FormPrevious } from 'grommet-icons'
import styled from 'styled-components'
import React from 'react'
import { Markdownz } from '@zooniverse/react-components'
import zooTheme from '@zooniverse/grommet-theme'
import PropTypes from 'prop-types'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  padding: 0;

  &:hover > svg, &:focus > svg {
    fill: ${zooTheme.global.colors['dark-5']};
    stroke: ${zooTheme.global.colors['dark-5']};
  }
`

const FieldGuideItemHeader = styled(Box)`
  > h3 {
    margin: 0;
  }
`

const FieldGuideItemContent = styled(Box)`
  > h1, h2, h3, h4, h5, h6 {
    font-size: 14px;
    letter-spacing: 1.5px;
    line-height: 17px;
    margin: 5px 0;
  }

  > p {
    margin: 5px 0;
  }
`

function storeMapper (stores) {
  const { setActiveItemIndex, attachedMedia: icons } = stores.classifierStore.fieldGuide
  return {
    icons,
    setActiveItemIndex
  }
}

@inject(storeMapper)
@observer
class FieldGuideItem extends React.Component {
  render () {
    const { className, icons, item, setActiveItemIndex } = this.props
    const icon = icons.get(item.icon)

    return (
      <Box className={className}>
        <FieldGuideItemHeader
          align='center'
          border={{ color: 'light-5', side: 'bottom' }}
          direction='row'
          flex={{ grow: 1, shrink: 0 }}
          pad={{ bottom: 'small' }}
        >
          <StyledButton
            a11yTitle={counterpart('FieldGuideItem.ariaTitle')}
            icon={<FormPrevious color='light-5' />}
            margin={{ right: 'small' }}
            onClick={() => setActiveItemIndex()}
            plain
          />
          <Markdownz>
            {`### ${item.title}`}
          </Markdownz>
        </FieldGuideItemHeader>
        <FieldGuideItemContent direction='column' overflow='auto'>
          <FieldGuideItemIcon icon={icon} height='140' margin={{ top: 'small', bottom: '35px' }} viewBox='0 0 200 100' />
          <Markdownz>
            {item.content}
          </Markdownz>
        </FieldGuideItemContent>
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
  setActiveItemIndex: PropTypes.func.isRequired
}

export default FieldGuideItem
