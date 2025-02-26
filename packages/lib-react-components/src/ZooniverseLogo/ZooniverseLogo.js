import { string } from 'prop-types'
import { useTranslation } from '../translations/i18n'

export default function ZooniverseLogo ({ id, size = '1em', ...rest }) {
  const { t } = useTranslation()

  return (
    <svg
      role='img'
      viewBox='0 0 100 100'
      width={size}
      height={size}
      aria-labelledby={id}
      {...rest}
    >
      <title id={id}>
        {t('ZooniverseLogo.title')}
      </title>
      <g fill='currentColor' stroke='none' transform='translate(50, 50)'>
        <path d='M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z' />
        <path d='M 0 -14 A 14 14 0 0 1 0 14 A 14 14 0 0 1 0 -14 Z' />
        <ellipse cx='0' cy='0' rx='6' ry='65' transform='rotate(50)' />
      </g>
    </svg>
  )
}

ZooniverseLogo.propTypes = {
  id: string.isRequired,
  size: string
}
