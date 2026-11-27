import { Box } from 'grommet'
import { arrayOf, bool, func, node, number, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Media from '../../../../../Media'
import MediaContainer from '../../../MediaContainer'
import MediaFallback from '../../../MediaFallback'
import FlipbookControls from '../FlipbookControls'
import Audio from '../Audio'
import Image from '../Image'
import Video from '../Video'

const FLIPBOOK_INTERVAL = 500
export const MULTI_MEDIA_CONTROLS_HEIGHT = 45

const StyledPreview = styled(Box)`
	overflow: hidden;
`

function getMediaType(mimeType) {
	return mimeType?.split('/')[0]
}

function MultiMedia({
	linkTitle,
	placeholder,
	sources = [],
	previewHeight,
	selectProps,
	subjectIdTitle,
	width,
	url
}) {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [playing, setPlaying] = useState(false)

	const sourcesLength = sources.length
	const currentSource = sources[currentFrame]
	const currentMediaType = getMediaType(currentSource?.mimeType)

	useEffect(() => {
		if (!playing || sourcesLength < 2) {
			return undefined
		}

		const timer = window.setTimeout(() => {
			setCurrentFrame(previousFrame => {
				if (previousFrame < sourcesLength - 1) {
					return previousFrame + 1
				}

				return 0
			})
		}, FLIPBOOK_INTERVAL)

		return () => {
			window.clearTimeout(timer)
		}
	}, [currentFrame, sourcesLength, playing])

	if (!currentSource) return null

	function handleFrameChange(frameIndex) {
		setPlaying(false)
		setCurrentFrame(frameIndex)
	}

	function handlePlayPause() {
		setPlaying(previousPlaying => !previousPlaying)
	}

	function renderMediaContent() {
		const commonProps = {
			linkTitle,
			previewHeight,
			selectProps,
			subjectIdTitle,
			width,
			url
		}

		if (currentMediaType === 'image') {
			return (
				<MediaContainer
					href={url}
					selectProps={selectProps}
					title={linkTitle}
				>
					<StyledPreview
						justify='center'
						height={`${previewHeight}px`}
						round={{ corner: 'top', size: '8px' }}
						width={`${width}px`}
					>
						<Image
							alt={subjectIdTitle}
							fit='contain'
							height={previewHeight}
							src={currentSource.url}
							width={width}
						/>
					</StyledPreview>
				</MediaContainer>
			)
		}

		if (currentMediaType === 'video') {
			return (
				<Video
					{...commonProps}
					mediaSrc={currentSource.url}
				/>
			)
		}

		if (currentMediaType === 'audio') {
			return (
				<Audio
					{...commonProps}
					mediaSrc={currentSource.url}
				/>
			)
		}

		if (currentMediaType === 'text') {
			return (
				<MediaContainer
					href={url}
					selectProps={selectProps}
					title={linkTitle}
				>
					<StyledPreview
						justify='center'
						height={`${previewHeight}px`}
						round={{ corner: 'top', size: '8px' }}
						width={`${width}px`}
					>
						<Media
							alt={subjectIdTitle}
							defaultMimeType='text'
							height={previewHeight}
							src={currentSource.url}
							width={width}
						/>
					</StyledPreview>
				</MediaContainer>
			)
		}

		if (currentMediaType === 'application') {
			return (
				<MediaContainer
					href={url}
					selectProps={selectProps}
					title={linkTitle}
				>
					<StyledPreview
						justify='center'
						height={`${previewHeight}px`}
						round={{ corner: 'top', size: '8px' }}
						width={`${width}px`}
					>
						<Media
							alt={subjectIdTitle}
							defaultMimeType='application'
							height={previewHeight}
							showAxes={true}
							showLegend={true}
							src={currentSource.url}
							width={width}
						/>
					</StyledPreview>
				</MediaContainer>
			)
		}

		return (
			<MediaContainer
				href={url}
				selectProps={selectProps}
				title={linkTitle}
			>
				<MediaFallback
					alt={subjectIdTitle}
					placeholder={placeholder}
					previewHeight={previewHeight}
					width={width}
				/>
			</MediaContainer>
		)
	}

	return (
		<>
			{renderMediaContent()}
			<FlipbookControls
				currentFrame={currentFrame}
				onFrameChange={handleFrameChange}
				onPlayPause={handlePlayPause}
				playing={playing}
				sources={sources}
			/>
		</>
	)
}

MultiMedia.propTypes = {
	linkTitle: string.isRequired,
	placeholder: node,
	sources: arrayOf(shape({
		mimeType: string.isRequired,
		url: string.isRequired
	})).isRequired,
	previewHeight: number.isRequired,
	selectProps: shape({
		onSelect: func,
		selectable: bool,
		selected: bool,
		selectLabel: string
	}),
	subjectIdTitle: string.isRequired,
	width: number.isRequired,
	url: string.isRequired
}

export default MultiMedia
