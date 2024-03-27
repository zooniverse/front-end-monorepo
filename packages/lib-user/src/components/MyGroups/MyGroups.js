import { Grid } from 'grommet'
import { func, node } from 'prop-types'

import { ContentBox, Layout } from '@components/shared'
import CreateGroup from './CreateGroup'

const DEFAULT_HANDLER = () => true

function MyGroups({
  children,
  handleGroupCreate = DEFAULT_HANDLER
}) {
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
            count: 2,
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
