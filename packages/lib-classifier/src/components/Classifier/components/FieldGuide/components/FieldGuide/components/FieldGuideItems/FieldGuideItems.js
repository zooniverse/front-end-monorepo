import { Box, Grid } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import FieldGuideItemAnchor from '../FieldGuideItemAnchor'

function FieldGuideItems ({ icons, items, onChange, strings }) {
  return (
    <Box overflow='auto'>
      <Grid
        columns={{ count: 'fill', size: '100px' }}
        gap='medium'
        rows='150px'
        width='100%'
      >
        {items.map((item, index) => (
          <FieldGuideItemAnchor
            key={item.title}
            icons={icons}
            item={item}
            itemIndex={index}
            onClick={onChange}
            title={strings[`items.${index}.title`]}
          />
        ))}

      </Grid>
    </Box>
  )
}

FieldGuideItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default FieldGuideItems
