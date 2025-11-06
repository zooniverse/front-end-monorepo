import { Anchor, Box, Text } from 'grommet'
import { observable } from 'mobx'
import { object, string} from 'prop-types'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { useCallback } from 'react'
import FieldGuideItemIcon from '../FieldGuideItemIcon'

const defaultIcons = observable.map()

export function AnchorLabel({
  className = '',
  icons = defaultIcons,
  item,
  title
}) {
  const icon = icons.get(item.icon)
  return (
    <Box align='center' className={className} direction='column'>
      <FieldGuideItemIcon
        alt={title}
        height={100}
        icon={icon}
        width={100}
      />
      <Text margin={{ vertical: '15px' }}>{title}</Text>
    </Box>
  )
}

function FieldGuideItemAnchor({
  className = '',
  icons = defaultIcons,
  item,
  itemIndex,
  onClick,
  title
}) {
  const selectItem = useCallback(function (event) {
    onClick(itemIndex)
    event.preventDefault()
  }, [itemIndex, onClick])

  const label = <AnchorLabel icons={icons} item={item} title={title} />
  return (
    <Anchor
      className={className}
      color={{ light: 'dark-5', dark: 'light-3' }}
      href={`#field-guide-item-${itemIndex}`}
      label={label}
      onClick={selectItem}
    />
  )
}

FieldGuideItemAnchor.propTypes = {
  className: string,
  icons: MobXPropTypes.observableMap,
  item: object.isRequired,
  label: string,
}

export default FieldGuideItemAnchor
