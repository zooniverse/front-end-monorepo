import React from 'react'
import { Heading, Paragraph } from 'grommet'

import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import Head from '../../shared/components/Head'

export default () => (
  <>
    <Head
      description='Information on how to cite Zooniverse research in academic papers, and in the press.'
      title='Acknowledging the Zooniverse'
    />
    <SingleColumnLayout>
      <article>
        <Heading size='small'>
          Acknowledging the Zooniverse
        </Heading>

        <Heading level='2' size='small'>
          Academic Citation
        </Heading>

        <Paragraph>
          Per the Zooniverse Project Builder Policies, all research publications using any data derived from Zooniverse approved projects (those listed on the Zooniverse Projects page) are required to acknowledge the Zooniverse and the Project Builder platform. To do so, please use the following text:
        </Paragraph>

        <Paragraph>
          This publication uses data generated via the Zooniverse.org platform, development of which is funded by generous support, including a Global Impact Award from Google, and by a grant from the Alfred P. Sloan Foundation.
        </Paragraph>

        <Paragraph>
          We ask that all researchers making use of the Zooniverse Project Builder platform in any way also consider including the above acknowledgement in their publications.
        </Paragraph>

        <Paragraph>
          We strongly encourage project owners to report published accepted research publications using Zooniverse-produced data to us via this form. You can find a list of publications written using the Zooniverse on our Publications page.
        </Paragraph>

        <Paragraph>
          If you have any questions about how to acknowledge the Zooniverse, such as referencing a particular individual or custom code, please get in touch.
        </Paragraph>

        <Heading level='2' size='small'>
          Writing About Zooniverse in the Press
        </Heading>

        <Paragraph>
          When writing about specific Zooniverse projects in the press, please include the project URL (in print as well as digital editions).
        </Paragraph>

        <Paragraph>
          When writing about the Zooniverse in general, please include the Zooniverse.org URL somewhere in your article.
        </Paragraph>

        <Paragraph>
          If you are interested in interviewing a member of the team, please get in touch.
        </Paragraph>
      </article>
    </SingleColumnLayout>
  </>
)
