import { Box, Grid } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import FieldGuideItemAnchor from './FieldGuideItemAnchor'

export default function FieldGuideItems ({ className, items }) {
  return (
    <Box overflow='auto'>
      <Grid
        className={className}
        columns={{ count: 'fill', size: '100px' }}
        gap='medium'
        rows='150px'
        width='100%'
      >
          {items.map((item, index) => <FieldGuideItemAnchor key={item.title} item={item} itemIndex={index} />)}
      </Grid>
    </Box>
  )
}

FieldGuideItems.defaultProps = {
  className: ''
}

FieldGuideItems.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}
