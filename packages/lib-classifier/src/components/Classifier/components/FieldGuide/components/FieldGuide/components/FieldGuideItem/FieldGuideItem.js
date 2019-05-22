import { Markdownz } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Box, Heading, Paragraph } from 'grommet'
import { FormPrevious } from 'grommet-icons'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

import SpacedHeading from './components/SpacedHeading'
import FieldGuideItemIcon from '../FieldGuideItemIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  padding: 0;

  &:hover > svg, &:focus > svg {
    fill: ${props => props.theme.global.colors['dark-5']};
    stroke: ${props => props.theme.global.colors['dark-5']};
  }
`

const markdownTitleComponent = {
  h3: (nodeProps) => <Heading level='3' margin='none'>{nodeProps.children}</Heading>
}

const markdownComponents = {
  h1: (nodeProps) => <SpacedHeading level='1'>{nodeProps.children}</SpacedHeading>,
  h2: (nodeProps) => <SpacedHeading level='2'>{nodeProps.children}</SpacedHeading>,
  h3: (nodeProps) => <SpacedHeading level='3'>{nodeProps.children}</SpacedHeading>,
  h4: (nodeProps) => <SpacedHeading level='4'>{nodeProps.children}</SpacedHeading>,
  h5: (nodeProps) => <SpacedHeading level='5'>{nodeProps.children}</SpacedHeading>,
  h6: (nodeProps) => <SpacedHeading level='6'>{nodeProps.children}</SpacedHeading>,
  p: (nodeProps) => <Paragraph margin={{ bottom: 'none', top: 'xxsmall' }}>{nodeProps.children}</Paragraph>
}

function storeMapper (stores) {
  const { setActiveItemIndex, attachedMedia: icons } = stores.classifierStore.fieldGuide
  return {
    icons,
    setActiveItemIndex
  }
}

class FieldGuideItem extends React.Component {
  render () {
    const { className, icons, item, setActiveItemIndex } = this.props
    const icon = icons.get(item.icon)

    return (
      <Box className={className}>

        <Box
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
          <Markdownz components={markdownTitleComponent}>
            {`### ${item.title}`}
          </Markdownz>
        </Box>

        <Box direction='column' overflow='auto'>
          <FieldGuideItemIcon
            icon={icon}
            height='140'
            margin={{ top: 'small', bottom: '35px' }}
            viewBox='0 0 200 100'
          />
          <Markdownz components={markdownComponents}>
            {item.content}
          </Markdownz>
        </Box>

      </Box>
    )
  }
}

FieldGuideItem.defaultProps = {
  className: '',
  icons: observable.map()
}

FieldGuideItem.propTypes = {
  className: PropTypes.string,
  icons: MobXPropTypes.observableMap,
  item: PropTypes.object.isRequired,
  setActiveItemIndex: PropTypes.func.isRequired
}

@inject(storeMapper)
@withTheme
@observer
class DecoratedFieldGuideItem extends FieldGuideItem { }

export default DecoratedFieldGuideItem
export { FieldGuideItem }
