import { bool, node, number, arrayOf, string } from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

import FlipbookControls from '../FlipbookControls'
import MediaLink from '../../../MediaLink'
import SimpleMedia from '../../../SimpleMedia/SimpleMedia'

const FLIPBOOK_INTERVAL = 500
export const MULTI_MEDIA_CONTROLS_HEIGHT = 45

function MultiMedia({
	linkTitle,
	mediaSources = [],
	placeholder,
	previewHeight,
	showBackground,
	subjectIdTitle,
	width,
	url
}) {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [playing, setPlaying] = useState(false)

	const currentMediaSrc = useMemo(() => {
		return mediaSources[currentFrame]
	}, [currentFrame, mediaSources])

	useEffect(() => {
		setCurrentFrame(0)
		setPlaying(false)
	}, [mediaSources])

	useEffect(() => {
		if (!playing || mediaSources.length < 2) {
			return undefined
		}

		const timer = window.setTimeout(() => {
			setCurrentFrame(previousFrame => {
				if (previousFrame < mediaSources.length - 1) {
					return previousFrame + 1
				}

				return 0
			})
		}, FLIPBOOK_INTERVAL)

		return () => {
			window.clearTimeout(timer)
		}
	}, [currentFrame, mediaSources.length, playing])

	if (!currentMediaSrc) return null

	function handleFrameChange(frameIndex) {
		setPlaying(false)
		setCurrentFrame(frameIndex)
	}

	function handlePlayPause() {
		setPlaying(previousPlaying => !previousPlaying)
	}

	return (
		<>
			<MediaLink
				href={url}
				title={linkTitle}
			>
				<SimpleMedia
					linkTitle={linkTitle}
					mediaSrc={currentMediaSrc}
					placeholder={placeholder}
					previewHeight={previewHeight}
					showBackground={showBackground}
					showTitle={false}
					subjectIdTitle={subjectIdTitle}
					width={width}
					url={url}
				/>
			</MediaLink>
			<FlipbookControls
				currentFrame={currentFrame}
				imageSources={mediaSources}
				onFrameChange={handleFrameChange}
				onPlayPause={handlePlayPause}
				playing={playing}
			/>
		</>
	)
}

MultiMedia.propTypes = {
	linkTitle: string.isRequired,
	mediaSources: arrayOf(string).isRequired,
	placeholder: node,
	previewHeight: number.isRequired,
	showBackground: bool,
	subjectIdTitle: string.isRequired,
	width: number.isRequired,
	url: string.isRequired
}

export default MultiMedia
