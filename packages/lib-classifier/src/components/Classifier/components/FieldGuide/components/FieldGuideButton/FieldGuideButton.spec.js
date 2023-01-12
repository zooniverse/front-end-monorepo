import { render } from '@testing-library/react'
import { FieldGuideButton } from './FieldGuideButton'
import { FieldGuideFactory, FieldGuideMediumFactory } from '@test/factories'
import { Provider } from 'mobx-react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

describe('Component > FieldGuideButton', function () {
  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>{children}</Provider>
        </Grommet>
      )
    }
  }

  const medium = FieldGuideMediumFactory.build()
  const items = [
    {
      title: 'Cat',
      icon: medium.id,
      content: 'lorem ipsum'
    },
    {
      title: 'Dog',
      content: 'Foo bar'
    },
    { title: 'Iguana', content: 'hello' },
    { title: 'Koala', content: '' },
    { title: 'Dragon', content: 'Why is this here?' }
  ]
  const fieldGuide = FieldGuideFactory.build({ items })
  const fieldGuideWithoutItems = FieldGuideFactory.build()

  it("should disable the button if there isn't a field guide", function () {
    const mockStore = {
      subjectViewer: { viewerWidth: 'default' }
    }
    const { getByText } = render(
      <FieldGuideButton fieldGuide={null} onClick={() => true} />,
      {
        wrapper: withStore(mockStore)
      }
    )
    const fieldGuideBtn = getByText('FieldGuide.FieldGuideButton.buttonLabel')
    expect(fieldGuideBtn.closest('button')).to.have.attribute('disabled')
  })

  it('should disable the button if the field guide doesn\'t have items', function () {
    const mockStore = {
      subjectViewer: { viewerWidth: 'default' }
    }
    const { getByText } = render(
      <FieldGuideButton fieldGuide={fieldGuideWithoutItems} onClick={() => true} />,
      {
        wrapper: withStore(mockStore)
      }
    )
    const fieldGuideBtn = getByText('FieldGuide.FieldGuideButton.buttonLabel')
    expect(fieldGuideBtn.closest('button')).to.have.attribute('disabled')
  })

  it('should enable the button if the field guide has items', function () {
    const mockStore = {
      subjectViewer: { viewerWidth: 'default' }
    }
    const { getByText } = render(
      <FieldGuideButton fieldGuide={fieldGuide} onClick={() => true} />,
      {
        wrapper: withStore(mockStore)
      }
    )
    const fieldGuideBtn = getByText('FieldGuide.FieldGuideButton.buttonLabel')
    expect(fieldGuideBtn.closest('button')).to.not.have.attribute('disabled')
  })
})
