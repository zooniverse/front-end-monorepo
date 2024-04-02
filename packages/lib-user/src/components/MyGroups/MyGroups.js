import { Grid, ResponsiveContext } from 'grommet'
import { func, node } from 'prop-types'
import { useContext } from 'react'

import { ContentBox, Layout } from '@components/shared'
import CreateGroup from './CreateGroup'

const DEFAULT_HANDLER = () => true

function MyGroups({
  children,
  handleGroupCreate = DEFAULT_HANDLER
}) {
  const size = useContext(ResponsiveContext)
  const columnCount = size === 'small' ? 1 : 2

  return (
    <Layout>
      <ContentBox
        linkLabel='Learn more about Groups'
        linkProps={{ href: '/groups' }}
        title='My Groups'
        pad={{ horizontal: '60px', vertical: '30px' }}
      >
        <Grid
          as='ul'
          columns={{
            count: columnCount,
            size: 'auto'
          }}
          gap={{ row: '20px', column: '40px' }}
          pad='none'
        >
          {children}
        </Grid>
        <CreateGroup
          handleGroupCreate={handleGroupCreate}
        />
      </ContentBox>
    </Layout>
  )
}

MyGroups.propTypes = {
  children: node,
  handleGroupCreate: func
}

export default MyGroups
