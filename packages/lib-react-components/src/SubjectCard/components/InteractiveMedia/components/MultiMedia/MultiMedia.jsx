import { Box } from 'grommet'
import { number, arrayOf, string } from 'prop-types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import FlipbookControls from '../FlipbookControls'
import SubjectThumbnail from '../SubjectThumbnail'
import MediaLink from '../../../MediaLink'

const FLIPBOOK_INTERVAL = 500
export const MULTI_MEDIA_CONTROLS_HEIGHT = 45

const StyledPreview = styled(Box)`
	overflow: hidden;
`

function MultiMedia({
	linkTitle,
	mediaSources = [],
	previewHeight,
	subjectIdTitle,
	width,
	url
}) {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [playing, setPlaying] = useState(false)

	const mediaSourcesLength = mediaSources.length
	const currentMediaSrc = mediaSources[currentFrame]

	useEffect(() => {
		if (!playing || mediaSourcesLength < 2) {
			return undefined
		}

		const timer = window.setTimeout(() => {
			setCurrentFrame(previousFrame => {
				if (previousFrame < mediaSourcesLength - 1) {
					return previousFrame + 1
				}

				return 0
			})
		}, FLIPBOOK_INTERVAL)

		return () => {
			window.clearTimeout(timer)
		}
	}, [currentFrame, mediaSourcesLength, playing])

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
				<StyledPreview
					justify='center'
					height={`${previewHeight}px`}
					round={{ corner: 'top', size: '8px' }}
					width={`${width}px`}
				>
					<SubjectThumbnail
						alt={subjectIdTitle}
						fit='contain'
						height={previewHeight}
						src={currentMediaSrc}
						width={width}
					/>
				</StyledPreview>
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
	previewHeight: number.isRequired,
	subjectIdTitle: string.isRequired,
	width: number.isRequired,
	url: string.isRequired
}

export default MultiMedia
