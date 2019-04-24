import React from 'react'
import { Heading, Paragraph } from 'grommet'

import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import Head from '../../shared/components/Head'

export default () => (
  <>
    <Head
      description='Most of the time, the best way to reach the Zooniverse team, or any project teams, especially about any project-specific issues, is through the discussion boards.'
      title='Contact & Social Media'
    />
    <SingleColumnLayout>
      <article>
        <Heading size='small'>
          Contact & Social Media
        </Heading>

        <Paragraph>
          Most of the time, the best way to reach the Zooniverse team, or any project teams, especially about any project-specific issues, is through the discussion boards.
        </Paragraph>

        <Paragraph>
          If you need to contact the Zooniverse team about a general matter, you can also send an email to the team at contact@zooniverse.org. Please understand that the Zooniverse team is relatively small and very busy, so unfortunately we cannot reply to all of the emails we receive.
        </Paragraph>

        <Paragraph>
          If you are interested in collaborating with the Zooniverse, for instance on a custom-built project, please email collab@zooniverse.org. (Note that our Project Builder offers an effective way to set up a new project without needing to contact the team!)
        </Paragraph>

        <Paragraph>
          For press inquires, please contact the Zooniverse directors Chris Lintott at chris@zooniverse.org or +44 (0) 7808 167288 or Laura Trouille at trouille@zooniverse.org or +1 312 322 0820.
        </Paragraph>

        <Paragraph>
          If you want to keep up to date with what's going on across the Zooniverse and our latest results, check out the Daily Zooniverse or the main Zooniverse blog. You can also follow the Zooniverse on Twitter, Facebook, and Google+.
        </Paragraph>
      </article>
    </SingleColumnLayout>
  </>
)
