import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { render } from '@testing-library/react'

import Metadata from './Metadata'

describe('Metadata', function () {
  describe('when there is no metadata', function () {
    it('the MetadataButton should be disabled', function () {
      const { getByText } = render(
        <Grommet theme={zooTheme}>
          <Metadata />
        </Grommet>
      )
      const button = getByText('MetaTools.MetadataButton.label').closest('button')
      expect(button).to.have.attribute('disabled')
    })
  })
})
