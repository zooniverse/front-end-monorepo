import zooTheme from '@zooniverse/grommet-theme'
import { Button, Box, Heading, Text } from 'grommet'
import { FormPrevious } from 'grommet-icons'
import styled from 'styled-components'
import React from 'react'
import { observable } from 'mobx'
import { Markdownz, Media } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import counterpart from 'counterpart'
import en from './locales/en'

const FieldGuideItemHeader = styled(Box)`
  /* display: flex;
  flex-direction: row; */
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
    const { icons, item, setActiveItem } = this.props
    const icon = icons.get(item.icon)
    return (
      <Box>
        <FieldGuideItemHeader align='center' direction='row'>
          <Button
            a11yTitle="Go back to Field Guide items list"
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

FieldGuideItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default FieldGuideItem