import { Markdownz, Media, SpacedHeading } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Button, Box, Paragraph } from 'grommet'
import { FormPrevious } from 'grommet-icons'
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'

import FieldGuideItemIcon from '../FieldGuideItemIcon'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  padding: 0;


  ${props => props.theme.dark ? css`
    &:hover > svg,
    &:focus > svg {
      fill: ${props.theme.global.colors['light-2']};
      stroke: ${props.theme.global.colors['light-2']};
    }
  ` : css`
      &:hover > svg,
      &:focus > svg {
        fill: ${props.theme.global.colors['dark-5']};
        stroke: ${props.theme.global.colors['dark-5']};
      }
  `}
`
const markdownTitleComponent = {
  h3: (nodeProps) => <SpacedHeading level='3' margin='none'>{nodeProps.children}</SpacedHeading>
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

function FieldGuideItem (props) {
    const {
      className,
      icons,
      item,
      setActiveItemIndex
    } = props
    const icon = icons.get(item.icon)

    return (
      <Box className={className}>
        <Box
          align='center'
          border={{ color: 'light-5', side: 'bottom' }}
          direction='row'
          flex={{ grow: 1, shrink: 0 }}
          pad={{ bottom: 'xsmall' }}
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
            height='140px'
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

FieldGuideItem.defaultProps = {
  className: '',
  icons: observable.map(),
  theme: {
    global: {
      colors: {}
    }
  }
}

FieldGuideItem.propTypes = {
  className: PropTypes.string,
  icons: MobXPropTypes.observableMap,
  item: PropTypes.object.isRequired,
  setActiveItemIndex: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default withTheme(FieldGuideItem)
export { FieldGuideItem }
