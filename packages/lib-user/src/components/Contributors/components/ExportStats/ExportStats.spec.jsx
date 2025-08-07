import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { ConfirmLargeExport, ConfirmSmallExport, Loading, Error, SuccessNoFilename, SuccessWithFilename } from './ExportStats.stories'

describe('components > Contributors > ExportStats', function () {
  describe('ConfirmLargeExport', function () {
    const ConfirmLargeExportStory = composeStory(ConfirmLargeExport, Meta)
    let memberCount, fileSize

    before(function () {
      render(<ConfirmLargeExportStory />)
      memberCount = screen.getByText('Generate CSV of group stats for 5,000 members?')
      fileSize = screen.getByText('Approximately 3.5 MB.')
    })

    it('should show the correct member count', function () {
      expect(memberCount).toBeTruthy()
    })

    it('should show the correct file size estimate', function () {
      expect(fileSize).toBeTruthy()
    })
  })

  describe('ConfirmSmallExport', function () {
    const ConfirmSmallExportStory = composeStory(ConfirmSmallExport, Meta)
    let memberCount, fileSize

    before(function () {
      render(<ConfirmSmallExportStory />)
      memberCount = screen.getByText('Generate CSV of group stats for 400 members?')
      fileSize = screen.getByText('Approximately 750 KB.')
    })

    it('should show the correct member count', function () {
      expect(memberCount).toBeTruthy()
    })

    it('should show the correct file size estimate', function () {
      expect(fileSize).toBeTruthy()
    })
  })

  describe('Loading', function () {
    const LoadingStory = composeStory(Loading, Meta)
    let loadingMessage, progress

    before(function () {
      render(<LoadingStory />)
      loadingMessage = screen.getByText('Downloading data...')
      progress = screen.getByText('Progress: 65%')
    })

    it('should show the loading message', function () {
      expect(loadingMessage).toBeTruthy()
    })

    it('should show the progress', function () {
      expect(progress).toBeTruthy()
    })
  })

  describe('Error', function () {
    const ErrorStory = composeStory(Error, Meta)

    it('should show the error message', function () {
      render(<ErrorStory />)
      const errorMessage = screen.getByText('Network error: Failed to fetch user data')
      expect(errorMessage).toBeTruthy()
    })
  })

  describe('Success without filename', function () {
    const SuccessNoFilenameStory = composeStory(SuccessNoFilename, Meta)

    it('should show the download link', function () {
      render(<SuccessNoFilenameStory />)
      const downloadLink = screen.getByText('Generating stats export file. Do not close this browser tab.')
      expect(downloadLink).toBeTruthy()
    })
  })

  describe('Success with filename', function () {
    const SuccessWithFilenameStory = composeStory(SuccessWithFilename, Meta)

    it('should show the download link', function () {
      render(<SuccessWithFilenameStory />)
      const downloadLink = screen.getByText('TestGroup1234_data_export_2025-01-01T101010.csv')
      expect(downloadLink).toBeTruthy()
    })
  })
})
