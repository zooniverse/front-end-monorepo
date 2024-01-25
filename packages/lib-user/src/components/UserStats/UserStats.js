'use client'

// This component is a work in progress. It is not intended to be imported as-is, but is currently being used for initial UserStats local development.

import { node } from 'prop-types'

import Layout from '../shared/Layout/Layout'

function UserStats ({
  children
}) {
  return (
    <Layout>
      <div>
        <div style={{
          borderRadius: '8px',
          border: '0.5px solid #A6A7A9',
          boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
          color: 'black',
          height: '472px',
          marginBottom: '30px'
        }}>
          <p>User profile header goes here.</p>
          <p>Bar chart goes here.</p>
        </div>
        <div style={{
          borderRadius: '8px',
          border: '0.5px solid #A6A7A9',
          boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
          color: 'black',
          height: '300px'
        }}>
          <p>Top projects goes here.</p>
        </div>
      </div>
    </Layout>
  )
}

UserStats.propTypes = {
  children: node
}

export default UserStats
