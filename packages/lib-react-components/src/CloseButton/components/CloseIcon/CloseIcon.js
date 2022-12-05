import { Blank } from 'grommet-icons'

function CloseIcon (props) {
  return (
    <Blank viewBox='0 0 32 32' {...props}>
      <defs>
        <filter id='shadow'>
          <feDropShadow dx='4' dy='8' stdDeviation='4' />
        </filter>
      </defs>

      <path
        strokeWidth='1'
        style={{ style: 'filter:url(#shadow)' }}
        d='M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z'
      />
    </Blank>
  )
}

export default CloseIcon
