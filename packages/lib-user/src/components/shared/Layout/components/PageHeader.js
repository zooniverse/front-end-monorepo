import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { arrayOf, node } from 'prop-types'
import { ZooniverseLogotype } from '@zooniverse/react-components'
import styled from 'styled-components'

import HeaderDropdown from './HeaderDropdown'

const StyledBox = styled(Box)`
  @media print {
    display: none;
  }
`

const HeaderItems = styled(Box)`
  max-width: calc(90rem - 160px);
  white-space: nowrap;
`

function PageHeader({ primaryHeaderItem = '', secondaryHeaderItems = [] }) {
  const size = useContext(ResponsiveContext)

  return (
    <StyledBox
      forwardedAs='header'
      background='neutral-1'
      fill
      height={{ min: '140px', max: '140px' }}
      align='center'
      pad={{ horizontal: 'medium' }} // Matches ZooHeader and body horizontal padding
    >
      <HeaderItems
        direction='row'
        fill
        height={{ min: '70px', max: '70px' }}
        align='center'
        justify='between'
      >
        <Box align='center' direction='row'>
          {primaryHeaderItem}
        </Box>
        <Box align='center' justify='end' direction='row' gap='xxsmall'>
          {secondaryHeaderItems.length > 0 ? (
            size !== 'small' ? (
              secondaryHeaderItems
            ) : (
              <HeaderDropdown secondaryHeaderItems={secondaryHeaderItems} />
            )
          ) : (
            <ZooniverseLogotype id='HeaderZooniverseLogo' color='white' />
          )}
        </Box>
      </HeaderItems>
    </StyledBox>
  )
}

PageHeader.propTypes = {
  primaryHeaderItem: node,
  secondaryHeaderItems: arrayOf(node)
}

export default PageHeader
