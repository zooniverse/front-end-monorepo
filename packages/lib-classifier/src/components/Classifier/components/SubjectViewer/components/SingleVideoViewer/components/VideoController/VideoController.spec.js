import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import sinon from 'sinon'
import { expect } from 'chai'
import { Grommet } from 'grommet'

import formatTimeStamp from '@helpers/formatTimeStamp'
import VideoController from './VideoController'
import controlsTheme from './theme'

describe('Component > VideoController', function () {
  let onPlayPauseSpy, onSpeedChangeSpy
  const subjectDuration = 10.0
  const subjectTimeStamp = 0.2

  beforeEach(function () {
    onPlayPauseSpy = sinon.spy()
    onSpeedChangeSpy = sinon.spy()
  })

  it('should display the video subject timestamp and duration', function () {
    render(
      <Grommet theme={controlsTheme}>
        <VideoController
          duration={subjectDuration}
          played={subjectTimeStamp}
        />
      </Grommet>
    )
    const durationText = screen.getByText(formatTimeStamp(subjectDuration))
    expect(durationText).exists()
    const timeStampText = screen.getByText(
      formatTimeStamp(subjectTimeStamp, subjectDuration)
    )
    expect(timeStampText).exists()
  })

  it('should handle play and pause', async function () {
    const user = userEvent.setup({ delay: null })
    const { rerender } = render(
      <Grommet theme={controlsTheme}>
        <VideoController
          duration={subjectDuration}
          isPlaying={false}
          onPlayPause={onPlayPauseSpy}
          played={subjectTimeStamp}
        />
      </Grommet>
    )
    const playButton = screen.getByLabelText(
      'SubjectViewer.VideoController.play'
    )
    await user.pointer({
      keys: '[MouseLeft]',
      target: playButton
    })
    expect(onPlayPauseSpy).to.have.been.calledOnce()

    rerender(
      <Grommet theme={controlsTheme}>
        <VideoController
          duration={subjectDuration}
          isPlaying
          onPlayPause={onPlayPauseSpy}
          played={subjectTimeStamp}
        />
      </Grommet>
    )

    const pauseButton = screen.getByLabelText(
      'SubjectViewer.VideoController.pause'
    )
    await user.pointer({
      keys: '[MouseLeft]',
      target: pauseButton
    })
    expect(onPlayPauseSpy).to.have.been.calledTwice()
  })

  it('should change the playback rate', async function () {
    sinon.stub(window, 'scrollTo')
    render(
      <Grommet theme={controlsTheme}>
        <VideoController
          duration={subjectDuration}
          played={subjectTimeStamp}
          onSpeedChange={onSpeedChangeSpy}
        />
      </Grommet>
    )

    const speedInput = screen.getByLabelText(
      'SubjectViewer.VideoController.playbackSpeed; Selected: 1x'
    )

    fireEvent.change(speedInput, { target: { value: '0.25x' } })
    expect(speedInput.value).to.equal('0.25x')

    // The following assertion does not work with a Grommet Select ¯\_(ツ)_/¯
    // expect(onSpeedChangeSpy).to.have.been.calledOnce()

    window.scrollTo.restore()
  })

  it('should have a volume range input', async function () {
    const user = userEvent.setup()
    const handleVolumeOpenSpy = sinon.spy()

    const { rerender } = render(
      <Grommet theme={controlsTheme}>
        <VideoController
          duration={subjectDuration}
          handleVolumeOpen={handleVolumeOpenSpy}
          played={subjectTimeStamp}
          volumeOpen={false}
        />
      </Grommet>
    )

    const volumeButton = screen.getByLabelText(
      'SubjectViewer.VideoController.openVolume'
    )

    await user.pointer({
      keys: '[MouseLeft]',
      target: volumeButton
    })

    expect(handleVolumeOpenSpy).to.have.been.calledOnce()

    rerender(
      <Grommet theme={controlsTheme}>
        <VideoController
          duration={subjectDuration}
          played={subjectTimeStamp}
          volumeOpen
        />
      </Grommet>
    )

    const volumeRangeInput = screen.getByLabelText('SubjectViewer.VideoController.volumeSlider')
    expect(volumeRangeInput).exists()
  })

  // Skipped while improving styling and accessibility of the custom controls
  xit('should not have a fullscreen button if drawing tools are enabled', async function () {
    render(
      <Grommet theme={controlsTheme}>
        <VideoController
          duration={subjectDuration}
          enableDrawing
          played={subjectTimeStamp}
        />
      </Grommet>
    )

    const fullscreenButton = screen.queryByLabelText('SubjectViewer.VideoController.fullscreen')
    expect(fullscreenButton).to.be.null()
  })
})
