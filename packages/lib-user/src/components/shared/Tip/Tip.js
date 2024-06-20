import {
  Button,
  Text,
  Tip as GrommetTip
} from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { shape, string } from 'prop-types'

function Tip({
  buttonProps,
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
        icon={<CircleInformation size='0.75rem' />}
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
