import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { composeStory } from '@storybook/react'
import Meta, { Volume4x4x4 } from './VolumetricViewer.stories.js'
import { VolumetricViewerData } from './../VolumetricViewer.js'
import subjectData from './../data/4x4x4.json'

// GH test:ci fails for this because of "gl" being needed

xdescribe('Component > VolumetricViewer', () => {
  const VolumetricViewer = composeStory(Volume4x4x4, Meta)

  beforeEach(() => {
    render(<VolumetricViewer />)
  })

  it('should load without errors', () => {
    expect(document).to.be.ok()
  })

  it('should render the 3 planes', () => {
    expect(screen.getByTestId('plane-canvas-0')).to.be.ok()
    expect(screen.getByTestId('plane-canvas-1')).to.be.ok()
    expect(screen.getByTestId('plane-canvas-2')).to.be.ok()
  })

  it('should render the cube', () => {
    expect(screen.getByTestId('cube')).to.be.ok()
    expect(screen.getByTestId('cube-axis')).to.be.ok()
    expect(screen.getByTestId('cube-histogram')).to.be.ok()
  })
})

// GH test:ci fails for this because of "gl" being needed
xdescribe('Component > VolumetricViewerData', () => {
  const VolumetricViewer = VolumetricViewerData({
    subjectData,
    subjectUrl: ''
  })

  describe('Component Rendering', () => {
    const VVComponent = VolumetricViewer.component

    beforeEach(() => {
      render(<VVComponent {...VolumetricViewer.data} />)
    })

    it('should load without errors', () => {
      expect(document).to.be.ok()
    })

    it('should render the 3 planes', () => {
      expect(screen.getByTestId('plane-canvas-0')).to.be.ok()
      expect(screen.getByTestId('plane-canvas-1')).to.be.ok()
      expect(screen.getByTestId('plane-canvas-2')).to.be.ok()
    })

    it('should render the cube', () => {
      expect(screen.getByTestId('cube')).to.be.ok()
      expect(screen.getByTestId('cube-axis')).to.be.ok()
      expect(screen.getByTestId('cube-histogram')).to.be.ok()
    })
  })

  describe('Model Management', () => {
    it('should load without errors', () => {
      const { annotations, tool, viewer } = VolumetricViewer.data.models

      expect(annotations).to.be.ok()
      expect(tool).to.be.ok()
      expect(viewer).to.be.ok()
    })
  })
})
