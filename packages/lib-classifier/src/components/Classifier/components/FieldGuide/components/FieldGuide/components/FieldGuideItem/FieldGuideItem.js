import { Markdownz, SpacedHeading } from '@zooniverse/react-components'
import { Button, Box, Paragraph } from 'grommet'
import { FormPrevious } from 'grommet-icons'
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

import FieldGuideItemIcon from '../FieldGuideItemIcon'

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

const defaultIcons = observable.map()
function FieldGuideItem ({
  className = '',
  content = '',
  icons = defaultIcons,
  id,
  item,
  setActiveItemIndex,
  title = ''
} ) {
  const icon = icons.get(item.icon)

  const { t } = useTranslation('components')

  return (
    <Box id={id} className={className}>
      <Box
        align='center'
        border={{ color: 'light-5', side: 'bottom' }}
        direction='row'
        flex={{ grow: 1, shrink: 0 }}
        pad={{ bottom: 'xsmall' }}
      >
        <StyledButton
          a11yTitle={t('FieldGuide.FieldGuideItem.ariaTitle')}
          icon={<FormPrevious color='light-5' />}
          margin={{ right: 'small' }}
          onClick={() => setActiveItemIndex()}
          plain
        />
        <Markdownz components={markdownTitleComponent}>
          {`### ${title}`}
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
          {content}
        </Markdownz>
      </Box>
    </Box>
  )
}

FieldGuideItem.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  icons: MobXPropTypes.observableMap,
  id: PropTypes.string,
  item: PropTypes.object.isRequired,
  setActiveItemIndex: PropTypes.func.isRequired,
  strings: PropTypes.string,
  theme: PropTypes.object,
  title: PropTypes.string
}

export default withTheme(FieldGuideItem)
export { FieldGuideItem }
