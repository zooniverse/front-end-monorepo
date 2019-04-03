import { Grid } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import FieldGuideItemAnchor from './FieldGuideItemAnchor'

export default function FieldGuideItems({ className, items }) {
  return (
    <Grid
      className={className}
      columns={{ count: 'fill', size: '100px' }}
      margin={{ bottom: 'small' }}
      gap='medium'
      rows='150px'
      width='100%'
    >
      {items.map((item) => {
        return (<FieldGuideItemAnchor key={item.title} item={item} />)})}
    </Grid>
  )
}

FieldGuideItems.defaultProps = {
  className: '',
}

FieldGuideItems.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}