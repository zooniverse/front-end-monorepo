import { Blank } from 'grommet-icons'

export default function FlipIcon (props) {
  return (
    <Blank
      viewBox='0 0 26 26'
      {...props}
    >
      <circle cx='13' cy='13' r='12' stroke='currentColor' fill='transparent' />
      <g transform='translate(6, 6)'>
        <polygon
          points="4.647375 8.27813672 4.647375 1.98481641 7.55198437 4.88942578 8.27813672 4.13906836 4.13906836 1.687539e-14 -3.99680289e-14 4.13906836 0.726152344 4.8652207 3.63076172 1.98481641 3.63076172 8.27813672"
          stroke='currentColor'
          strokeWidth='1'
        />
        <polygon
          points="10.3355684 13.1763867 14.4746367 9.03731836 13.7484844 8.28696094 10.843875 11.1915703 10.843875 4.89825 9.82726172 4.89825 9.82726172 11.1915703 6.92265234 8.31116602 6.1965 9.03731836"
          stroke='currentColor'
          strokeWidth='1'
        />
      </g>
    </Blank>
  )
}