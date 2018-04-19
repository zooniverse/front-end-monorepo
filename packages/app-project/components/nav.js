import Head from './head'
import Link from 'next/link'
import React from 'react'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/project" as="/projects/foo/bar">
          <a>Dummy project</a>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
