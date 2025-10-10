import { Box } from 'grommet'
import styled from 'styled-components'

import AncillaryDatum from './components/AncillaryDatum'

const StyledList = styled(Box)`
  list-style: none;
`

function AncillaryData({ media }) {
  return (
    <StyledList
      forwardedAs='ul'
      direction='row'
      gap='small'
      margin='none'
      pad='none'
      overflow={{ horizontal: 'auto' }}
    >
      {media?.map((item) => (
        <li key={item.id}>
          <AncillaryDatum datum={item} />
        </li>
      ))}
    </StyledList>
  )
}

export default AncillaryData
