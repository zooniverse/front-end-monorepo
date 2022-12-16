import { Grommet } from 'grommet'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MetadataButton from './MetadataButton'

describe('MetadataButton', function () {
  it('should not be clickable when disabled', async function () {
    const onClickSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })

    const { getByText } = render(
      <Grommet theme={zooTheme}>
        <MetadataButton disabled onClick={onClickSpy} />
      </Grommet>
    )
    const button = getByText('MetaTools.MetadataButton.label')

    await user.pointer({
      keys: '[MouseLeft]',
      target: button
    })
    expect(onClickSpy).to.not.have.been.called()
  })
})
