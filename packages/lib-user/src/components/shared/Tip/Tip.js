import {
  Button,
  Text,
  Tip as GrommetTip
} from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { shape, string } from 'prop-types'

const DEFAULT_BUTTON_PROPS = {
  iconSize: '0.75rem'
}

function Tip({
  buttonProps = DEFAULT_BUTTON_PROPS,
  contentText = ''
}) {
  return (
    <GrommetTip
      content={
        <Text>
          {contentText}
        </Text>
      }
      dropProps={{
        align: { top: 'bottom' },
        background: 'dark-4',
        round: '5px',
        pad: '5px'
      }}
      plain
    >
      <Button
        icon={<CircleInformation size={buttonProps.iconSize || DEFAULT_BUTTON_PROPS.iconSize} />}
        plain
        {...buttonProps}
      />
    </GrommetTip>
  )
}

Tip.propTypes = {
  buttonProps: shape({}),
  contentText: string,
  grommetTipProps: shape({}),
}

export default Tip
