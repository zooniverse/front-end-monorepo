import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import sinon from 'sinon'
import { observable } from 'mobx'
import userEvent from '@testing-library/user-event'

import FieldGuideItem from './FieldGuideItem'
import { FieldGuideMediumFactory } from '@test/factories'
import { expect } from 'chai'

const medium = FieldGuideMediumFactory.build()
const attachedMedia = observable.map().set(medium.id, medium)
const item = {
  title: 'Cat',
  icon: medium.id,
  content: 'lorem ipsum'
}

describe('Component > FieldGuide > FieldGuideItem', function () {
  it('should call setActiveItemIndex when the previous button is clicked', async function () {
    const setActiveItemIndexSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet theme={zooTheme}>
        <FieldGuideItem
          content='lorem ipsum'
          icons={attachedMedia}
          item={item}
          setActiveItemIndex={setActiveItemIndexSpy}
          theme={zooTheme}
          title='Cat'
        />
      </Grommet>
    )
    const button = screen.getByLabelText('FieldGuide.FieldGuideItem.ariaTitle')
    await user.pointer({
      keys: '[MouseLeft]',
      target: button
    })

    expect(setActiveItemIndexSpy).to.have.been.calledOnce()
  })

  it('should render title and markdown content', function () {
    render(
      <Grommet theme={zooTheme}>
        <FieldGuideItem
          content='lorem ipsum'
          icons={attachedMedia}
          item={item}
          setActiveItemIndex={() => {}}
          theme={zooTheme}
          title='Cat'
        />
      </Grommet>
    )
    const title = screen.getByText('Cat')
    const content = screen.getByText('lorem ipsum')
    expect(title).exists()
    expect(content).exists()
  })
})
