import { Box, Grid } from 'grommet'
import PropTypes from 'prop-types'
import FieldGuideItemAnchor from '../FieldGuideItemAnchor'

function FieldGuideItems ({ icons, items, onChange, strings }) {
  return (
    <Grid
      columns={{ count: 'fill', size: '100px' }}
      gap='medium'
      pad={{ top: 'medium' }}
      rows='150px'
      width='100%'
    >
      {items.map((item, index) => (
        <FieldGuideItemAnchor
          className='item'
          key={item.title}
          icons={icons}
          item={item}
          itemIndex={index}
          onClick={onChange}
          title={strings[`items.${index}.title`]}
        />
      ))}

    </Grid>
  )
}

FieldGuideItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default FieldGuideItems
