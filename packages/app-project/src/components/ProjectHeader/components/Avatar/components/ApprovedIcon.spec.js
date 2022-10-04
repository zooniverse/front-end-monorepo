import { render } from '@testing-library/react'
import { expect } from 'chai'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import ApprovedIcon from './ApprovedIcon'

describe('Component > ApprovedIcon', function () {
  it('should not crash', function () {
    const { getByLabelText } = render(
      <Grommet theme={zooTheme}>
        <ApprovedIcon isNarrow={false} />
      </Grommet>
    )
    const icon = getByLabelText('ProjectHeader.ApprovedIcon.title')
    expect(icon).exists()
  })
})
