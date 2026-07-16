import { Box } from 'grommet'
import { bool, node, number, string } from 'prop-types'
import styled from 'styled-components'

import Media from '../../../Media'

const StyledPreview = styled(Box)`
	overflow: hidden;
	position: relative;
`

const StyledBackground = styled(Box)`
	filter: blur(12px);
	inset: 0;
	position: absolute;
	transform: scale(1.2); // scale up the background to hide edges created by the blur
	z-index: 0;
`

const StyledForegroundMedia = styled(Media)`
	position: relative;
	z-index: 1;
`

const StyledTitle = styled(Box)`
	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
	bottom: 0;
	height: 72px;
	left: 0;
	position: absolute;
	right: 0;
	text-align: center;
	z-index: 2;
`

const StyledTitleText = styled.span`
	color: ${props => props.theme.global.colors.white};
	font-size: 1rem;
	font-weight: 400;
	letter-spacing: 0.8px;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`

function StaticMedia({
	mediaSrc,
	placeholder,
	previewHeight,
	showBackground,
	subjectIdTitle,
	width
}) {
	return (
		<StyledPreview
			height={`${previewHeight}px`}
			round={{ corner: 'top', size: '8px' }}
			width={`${width}px`}
		>
			{(mediaSrc && showBackground) ? (
				<StyledBackground>
					<Media
						alt=''
						aria-hidden='true'
						controls={false}
						fit='cover'
						height={previewHeight}
						src={mediaSrc}
						tabIndex={-1}
						width={width}
					/>
				</StyledBackground>
			) : null}

			{mediaSrc ? (
				<StyledForegroundMedia
					alt={subjectIdTitle}
					controls={false}
					fit='contain'
					height={previewHeight}
					placeholder={placeholder}
					src={mediaSrc}
					width={width}
				/>
			) : null}

			<StyledTitle
				align='center'
				direction='row'
				gap='xsmall'
				justify='center'
				pad={{ horizontal: 'small', vertical: 'medium' }}
			>
				<StyledTitleText>
					{subjectIdTitle}
				</StyledTitleText>
			</StyledTitle>
		</StyledPreview>
	)
}

StaticMedia.propTypes = {
	mediaSrc: string,
	placeholder: node,
	previewHeight: number.isRequired,
	showBackground: bool,
	subjectIdTitle: string.isRequired,
	width: number.isRequired
}

export default StaticMedia
