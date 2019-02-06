import React from 'react'
import { Icon } from 'grommet-icons'

export default function HeartIcon (props) {
  return (
    <Icon
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        strokeWidth='2' 
        d='M1,8.4 C1,4 4.5,3 6.5,3 C9,3 11,5 12,6.5 C13,5 15,3 17.5,3 C19.5,3 23,4 23,8.4 C23,15 12,21 12,21 C12,21 1,15 1,8.4 Z'
      />
    </Icon>
  )
}
