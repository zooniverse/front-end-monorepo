import { Link } from '../config/routes'
import React from 'react'

const Nav = () => (
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
            owner: 'emammal',
            project: 'emammal'
          }}
        >
          <a>Emammal</a>
        </Link>
      </li>
      <li>
        <Link
          prefetch
          route='project'
          params={{
            owner: 'dwright04',
            project: 'supernova-hunters'
          }}
        >
          <a>Supernova Hunters</a>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
