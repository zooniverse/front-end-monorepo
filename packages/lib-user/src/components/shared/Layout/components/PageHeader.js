import { Box } from 'grommet'
import { arrayOf, node } from 'prop-types'
import { ZooniverseLogotype } from '@zooniverse/react-components'
import styled from 'styled-components'

const HeaderItems = styled(Box)`
  max-width: calc(90rem - 160px);
`

function PageHeader({ primaryHeaderItem = '', secondaryHeaderItems = [] }) {
  return (
    <Box
      as='header'
      background='neutral-1'
      fill
      height={{ min: '140px' }}
      align='center'
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
        <Box
          align='center'
          justify='end'
          direction='row'
          gap='small'
          height='50%'
        >
          {secondaryHeaderItems.length > 0 ? (
            secondaryHeaderItems.map(HeaderItem => HeaderItem)
          ) : (
            <ZooniverseLogotype id='HeaderZooniverseLogo' color='white' />
          )}
        </Box>
      </HeaderItems>
    </Box>
  )
}

PageHeader.propTypes = {
  primaryHeaderItem: node,
  secondaryHeaderItems: arrayOf(node)
}

export default PageHeader
