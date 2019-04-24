import { Heading, Paragraph } from 'grommet'
import React from 'react'

import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import Head from '../../shared/components/Head'

export default () => (
  <SingleColumnLayout>
    <Head
      description='Humans are better than computers at many tasks. For most Zooniverse projects, computers just aren’t good enough to do the required task, or they may miss interesting features that a human would spot - this is why we need your help.'
      title='Frequently Asked Questions'
    />

    <article>
      <Heading size='small'>
        Frequently Asked Questions
      </Heading>

      <Heading level='2' size='small'>
        Why do researchers need your help? Why can't computers do these tasks?
      </Heading>

      <Paragraph>
        Humans are better than computers at many tasks. For most Zooniverse projects, computers just aren’t good enough to do the required task, or they may miss interesting features that a human would spot - this is why we need your help. Some Zooniverse projects are also using human classifications to help train computers to do better at these research tasks in the future. When you participate in a Zooniverse project, you are contributing to real research.
      </Paragraph>

      <Heading level='2' size='small'>
        How do I know if I'm doing this right?
      </Heading>

      <Paragraph>
        For most of the subjects shown in Zooniverse projects, the researchers don't know the correct answer and that's why they need your help. Human beings are really good at pattern recognition tasks, so generally your first guess is likely the right one. Don’t worry too much about making an occasional mistake - more than one person will review each image, video or graph in a project. Most Zooniverse projects have a Help button, a Frequently Asked Questions (FAQ) page, and a Field Guide with more information to guide you when classifying.
      </Paragraph>

      <Heading level='2' size='small'>
        What happens to my classification after I submit it?
      </Heading>

      <Paragraph>
        Your classifications are stored in the Zooniverse's secure online database. Later on a project's research team accesses and combines the multiple volunteer assessments stored for each subject, including your classifications, together. Once you have submitted your response for a given subject image, graph, or video, you can't go back and edit it. Further information can be found on the Zooniverse User Agreement and Privacy Policy page.
      </Paragraph>

      <Heading level='2' size='small'>
        What does the Zooniverse do with my account information?
      </Heading>

      <Paragraph>
        The Zooniverse takes very seriously the task of protecting our volunteer's personal information and classification data. Details about these efforts can be found on the Zooniverse User Agreement and Privacy Policy page and the Zooniverse Security page.
      </Paragraph>

      <Heading level='2' size='small'>
        I have a feature request or found a bug; who should I talk to/how do I report it?
      </Heading>

      <Paragraph>
        You can post your suggestions for new features and report bugs via the Zooniverse Talk or through the Zooniverse Software repository.
      </Paragraph>

      <Heading level='2' size='small'>
        Is the Zooniverse hiring?
      </Heading>

      <Paragraph>
        The Zooniverse is a collaboration between institutions from the United Kingdom and the United States; all of our team are employed by one or the other of these partner institutions. Check out the Zoonvierse jobs page to find out more about employment opportunities within the Zooniverse.
      </Paragraph>

      <Heading level='2' size='small'>
        I'm a project owner/research team member, how do I acknowledge the Zooniverse and the Project Builder Platform in my paper, talk abstract, etc.?
      </Heading>

      <Paragraph>
        You can find more details on how to cite the Zooniverse in research publications using data derived from use of the Zooniverse Project Builder on our Acknowledgements page.
      </Paragraph>

      <Heading level='2' size='small'>
        What browser version does Zooniverse support?
      </Heading>

      <Paragraph>
        We support major browsers up to the second to last version.
      </Paragraph>

      <Paragraph>
        Didn't find the answer to your question? Ask on Zooniverse Talk or get in touch.
      </Paragraph>
    </article>
  </SingleColumnLayout>
)
