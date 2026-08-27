import { Blank } from 'grommet-icons'

export default function SegmentedLineIcon (props) {
  return (
    <Blank
      viewBox='0 0 32 32'
      {...props}
    >
      <path
        d='M3.2106 21.8541L10.5896 7.0093L19.6154 21.7904L25.456 7.0091'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <circle cx='19.5746' cy='21.6003' r='3.3746' fill='currentColor' />
      <circle cx='3.3746' cy='21.6003' r='3.3746' fill='currentColor' />
      <circle cx='10.5746' cy='7.2003' r='3.3746' fill='currentColor' />
      <circle cx='25.4253' cy='7.2003' r='3.3746' fill='currentColor' />
    </Blank>
  )
}
