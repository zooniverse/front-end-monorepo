import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { arrayOf, node } from 'prop-types'
import { ZooniverseLogotype } from '@zooniverse/react-components'
import styled from 'styled-components'

import HeaderDropdown from './HeaderDropdown'

const HeaderItems = styled(Box)`
  max-width: calc(90rem - 160px);
`

function PageHeader({ primaryHeaderItem = '', secondaryHeaderItems = [] }) {
  const size = useContext(ResponsiveContext)

  return (
    <Box
      as='header'
      background='neutral-1'
      fill
      height={{ min: '140px' }}
      align='center'
      pad={{ horizontal: 'medium' }} // Matches ZooHeader and body horizontal padding
    >
      <HeaderItems
        direction='row'
        fill
        height={{ min: '70px' }}
        align='center'
        justify='between'
      >
        <Box align='center' direction='row'>
          {primaryHeaderItem}
        </Box>
        {size !== 'small' ? (
          <Box align='center' justify='end' direction='row' gap='small'>
            {secondaryHeaderItems.length > 0 ? (
              secondaryHeaderItems.map(HeaderItem => HeaderItem)
            ) : (
              <ZooniverseLogotype id='HeaderZooniverseLogo' color='white' />
            )}
          </Box>
        ) : (
          <HeaderDropdown secondaryHeaderItems={secondaryHeaderItems} />
        )}
      </HeaderItems>
    </Box>
  )
}

PageHeader.propTypes = {
  primaryHeaderItem: node,
  secondaryHeaderItems: arrayOf(node)
}

export default PageHeader
