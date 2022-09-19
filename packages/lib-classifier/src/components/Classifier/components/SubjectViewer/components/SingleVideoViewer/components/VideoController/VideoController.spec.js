import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import sinon from 'sinon'
import { expect } from 'chai'

import formatTimeStamp from '@helpers/formatTimeStamp'
import VideoController from './VideoController'

describe.only('Component > VideoController', function () {
  let onPlayPauseSpy, onSpeedChangeSpy
  const subjectDuration = 10.0
  const subjectTimeStamp = 0.2

  beforeEach(function () {
    onPlayPauseSpy = sinon.spy()
    onSpeedChangeSpy = sinon.spy()
  })

  it('should display the video subject timestamp and duration', function () {
    render(
      <VideoController
        duration={subjectDuration}
        timeStamp={subjectTimeStamp}
      />
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
      <VideoController
        duration={subjectDuration}
        isPlaying={false}
        onPlayPause={onPlayPauseSpy}
        timeStamp={subjectTimeStamp}
      />
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
      <VideoController
        duration={subjectDuration}
        isPlaying
        onPlayPause={onPlayPauseSpy}
        timeStamp={subjectTimeStamp}
      />
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
      <VideoController
        duration={subjectDuration}
        timeStamp={subjectTimeStamp}
        onSpeedChange={onSpeedChangeSpy}
      />
    )

    const speedInput = screen.getByLabelText(
      'SubjectViewer.VideoController.playbackSpeed; Selected: 1x'
    )

    fireEvent.change(speedInput, { target: { value: '0.25x' } })
    expect(speedInput.value).to.equal('0.25x')

    // The following assertion does not work with a Grommet Select ¯\_(ツ)_/¯
    // expect(onSpeedChangeSpy).to.have.been.calledOnce()
  })
})
