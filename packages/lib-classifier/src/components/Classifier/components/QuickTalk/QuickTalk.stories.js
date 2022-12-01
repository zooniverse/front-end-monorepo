import asyncStates from '@zooniverse/async-states'
import QuickTalk from './QuickTalk'

export default {
  title: 'Other / QuickTalk',
  component: QuickTalk,
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

const subject = {
  id: '100001',
  talkURL: 'https://www.zooniverse.org/projects/zootester/test-project/talk/subjects/100001',
}

const comments = [
  {
    id: '200001',
    body: 'This is the first comment',
    is_deleted: false,
    user_id: '300001',
    user_login: 'zootester',
  },
  {
    id: '200002',
    body: 'This is the second comment',
    is_deleted: false,
    user_id: '300001',
    user_login: 'zootester',
  },
  {
    id: '200003',
    body: 'This is the third comment',
    is_deleted: false,
    user_id: '300002',
    user_login: 'randomdude',
  },
]

const authors = {
  '300001': {
    id: '300001',
    avatar_src: null,
    credited_name: 'zootester',
    display_name: 'Zooniverse Tester',
    login: 'zootester',
  },
  '300002': {
    avatar_src: null,
    login: 'randomdude',
    credited_name: 'randomdude',
    display_name: 'Random Dude',
    login: 'randomdude',
  },
}

const authorRoles = {
  '300001': [{ name: 'admin', section: 'project-1234' }],
  '300002': [],
}

export function Default() {
  return (
    <QuickTalk
      subject={subject}
      comments={comments}
      authors={authors}
      authorRoles={authorRoles}
      fixedPosition={false}
      showBadge={false}
    />
  )
}

export function expanded() {
  return (
    <QuickTalk
      subject={subject}
      comments={comments}
      authors={authors}
      authorRoles={authorRoles}
      expand={true}
      fixedPosition={false}
      showBadge={false}
    />
  )
}
