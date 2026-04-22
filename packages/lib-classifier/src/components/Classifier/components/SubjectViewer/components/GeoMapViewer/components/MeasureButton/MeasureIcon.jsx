import { Blank } from 'grommet-icons'

export default function MeasureIcon (props) {
	return (
		<Blank viewBox='0 0 32 32' {...props}>
			<g transform='translate(0 8) scale(1.7778)'>
				<path d='M0 9.25H18' strokeWidth={1.5} />
				<path d='M0.75 0V9' strokeWidth={1.5} />
				<path d='M17.25 0V9' strokeWidth={1.5} />
				<path d='M9 0V9' strokeWidth={1.5} />
				<path d='M13.25 4V9' strokeWidth={1.5} />
				<path d='M4.75 4V9' strokeWidth={1.5} />
			</g>
		</Blank>
	)
}
