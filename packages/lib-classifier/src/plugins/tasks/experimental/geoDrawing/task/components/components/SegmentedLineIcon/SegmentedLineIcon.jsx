import { oneOfType, number, string } from 'prop-types'

function SegmentedLineIcon({ className, color, size = 24 }) {
  const stroke = color || 'currentColor'
  return (
    <svg
      aria-hidden='true'
      className={className}
      fill='none'
      height={size}
      role='img'
      viewBox='0 0 16 12'
      width={size}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1.78372 10.0158L5.88317 1.76869L10.8975 9.98045L14.1423 1.76868' stroke={stroke} />
      <circle cx='10.8748' cy='9.87476' r='1.37476' fill={stroke} stroke={stroke} />
      <circle cx='1.87476' cy='9.87476' r='1.37476' fill={stroke} stroke={stroke} />
      <circle cx='5.87476' cy='1.87476' r='1.37476' fill={stroke} stroke={stroke} />
      <circle cx='14.1252' cy='1.87476' r='1.37476' fill={stroke} stroke={stroke} />
    </svg>
  )
}

SegmentedLineIcon.propTypes = {
  className: string,
  color: string,
  size: oneOfType([number, string])
}

export default SegmentedLineIcon
