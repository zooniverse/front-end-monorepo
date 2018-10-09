import Link from 'next/link'
import React from 'react'

function Nav () {
  return (
    <nav>
      <ul>
        <li>
          <Link prefetch href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link
            prefetch
            href={{
              pathname: '/Home',
              query: {
                owner: 'stephenserjeant',
                project: 'what-is-beauty'
              }
            }}
            as='/projects/stephenserjeant/what-is-beauty'
          >
            <a>Am I Hot or Not</a>
          </Link>
        </li>
        <li>
          <Link
            prefetch
            href={{
              pathname: '/Home',
              query: {
                owner: 'markb-panoptes',
                project: 'miniature-fossils-magnified'
              }
            }}
            as='/projects/markb-panoptes/miniature-fossils-magnified'
          >
            <a>Miniature Fossils</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
