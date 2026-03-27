import { render } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { vi } from 'vitest'

import RadialFeedback from './RadialFeedback'

vi.mock('../../SubjectViewer/components/SingleImageViewer/SingleImageViewerContainer', () => {
  return {
    default: function MockSingleImageViewerContainer({ feedbackMarks }) {
      return (
        <svg data-testid='radial-feedback-viewer'>
          {feedbackMarks}
        </svg>
      )
    }
  }
})

describe('Component > RadialFeedback', function () {
  function renderComponent(classifierStore) {
    return render(
      <Provider classifierStore={classifierStore}>
        <RadialFeedback />
      </Provider>
    )
  }

  it('should render radial rule circles and overlay points for matching annotations', function () {
    const classifierStore = {
      classifications: {
        currentAnnotations: [
          {
            taskType: 'drawing',
            value: [
              { id: 'mark-1', frame: 1, x: 22, y: 31 },
              { id: 'mark-2', frame: 1, x: 120, y: 151 },
              { id: 'mark-3', frame: 0, x: 999, y: 999 },
              { id: 'mark-4', frame: 1, width: 20, x: 50, y: 50 }
            ]
          }
        ]
      },
      feedback: {
        applicableRules: [
          {
            id: 'success-rule',
            success: true,
            successfulClassifications: [{ x: 22, y: 31 }],
            tolerance: '15',
            x: '20',
            y: '30'
          },
          {
            id: 'failure-rule',
            success: false,
            successfulClassifications: [],
            tolerance: '10',
            x: '100',
            y: '150'
          }
        ]
      },
      subjectViewer: {
        frame: 1,
        loadingState: 'success'
      }
    }

    renderComponent(classifierStore)

    const ruleCircles = document.querySelectorAll('circle[fill-opacity="0.5"]')

    expect(ruleCircles).to.have.lengthOf(2)
    expect(document.querySelector('circle[stroke="green"][cx="20"][cy="30"][r="15"]')).to.not.equal(null)
    expect(document.querySelector('circle[stroke="red"][cx="100"][cy="150"][r="10"]')).to.not.equal(null)
    expect(document.querySelectorAll('g[stroke="#1B7F46"][transform="translate(22, 31)"]')).to.have.lengthOf(1)
    expect(document.querySelectorAll('g[stroke="#C23D2A"][transform="translate(120, 151)"]')).to.have.lengthOf(1)
    expect(document.querySelectorAll('g[stroke="#1B7F46"][transform="translate(20, 30)"]')).to.have.lengthOf(0)
    expect(document.querySelectorAll('g[stroke="#C23D2A"][transform="translate(100, 150)"]')).to.have.lengthOf(0)
    expect(document.querySelector('[transform="translate(999, 999)"]')).to.equal(null)
  })
})