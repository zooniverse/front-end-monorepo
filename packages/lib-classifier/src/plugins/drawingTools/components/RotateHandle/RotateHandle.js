import React, { forwardRef } from 'react'
import { string, number } from 'prop-types'
import draggable from '../draggable'
import { useTranslation } from 'react-i18next'

const RotateHandle = forwardRef(function RotateHandle(
  { fill = 'currentColor', scale = 1, x, y },
  ref
) {
  const { t } = useTranslation('components')
  const transform = `translate(${x}, ${y}) scale(${1 / scale})`

  return (
    <g
      ref={ref}
      transform={transform}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0'
        y='-12'
        height='24px'
        width='24px'
        viewBox='0 0 24 24'
        fill={fill}
        strokeWidth='0.5'
        role='img'
        aria-label={t('DrawingTools.RotateHandle')}
      >
        <path d='M0 0h24v24H0V0z' fill='transparent' stroke='transparent' />
        <path d='M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z' />
      </svg>
    </g>
  )
})

RotateHandle.propTypes = {
  /**
    The RotateHandle color
   */
  fill: string,
  /**
    Image scale factor. Used to keep line widths and sizes constant at all image scales.
   */
  scale: number,
  /**
    x position of the vertex closets to the origin before rotation
   */
  x: number.isRequired,
  /**
    y position of the vertex closets to the origin before rotation
   */
  y: number.isRequired
}

export default draggable(RotateHandle)
