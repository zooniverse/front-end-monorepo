import { Box, Grid } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import chunk from 'lodash/chunk'
import FieldGuideItemButton from './FieldGuideItemButton'

export default function FieldGuideItems({ className, items }) {
  const gridRows = chunk(items, 4)
  return (
    <Box basis='full' className={className} direction='row' wrap>
      {gridRows.map((row, index) => {
        return (
          <Grid
            columns={['100px', '100px', '100px', '100px']}
            key={index}
            margin={{ bottom: 'small' }}
            gap='medium'
            rows={['150px']}
          >
            <FieldGuideItemButton row={row} />
          </Grid>
        )
      })}
    </Box>
  )
}

FieldGuideItems.defaultProps = {
  className: '',
}

FieldGuideItems.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}