import { Link } from '../config/routes'
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
            route='project'
            params={{
              owner: 'stephenserjeant',
              project: 'what-is-beauty'
            }}
          >
            <a>Am I Hot or Not</a>
          </Link>
        </li>
        <li>
          <Link
            prefetch
            route='project'
            params={{
              owner: 'markb-panoptes',
              project: 'miniature-fossils-magnified'
            }}
          >
            <a>Miniature Fossils</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
