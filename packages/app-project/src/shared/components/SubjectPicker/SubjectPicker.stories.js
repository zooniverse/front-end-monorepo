import { Box } from 'grommet'
import SubjectPicker from './SubjectPicker'
import { http, HttpResponse } from 'msw'

function DecoratedStory(Story) {
  return (
    <Box pad='small'>
      <Story />
    </Box>
  )
}

export default {
  title: 'Project App / Shared / Subject Picker',
  component: SubjectPicker,
  decorators: [DecoratedStory],
  parameters: {
    msw: {
      handlers: [
        http.get('https://subject-set-search-api.zooniverse.org/subjects/15582.json', ({ request }) => {
          const columns = [
            'subject_id',
            'Page',
            'Date'
          ]
          const rows = [
            [1, '43', '23 January 1916'],
            [2, '44', '24 January 1916'],
            [3, '45', '25 January 1916']
          ]
          
          return HttpResponse.json({
            columns,
            rows
          })
        }),
        http.get('https://panoptes-staging.zooniverse.org/api/subjects/selection', ({ request }) => {
          return HttpResponse.json({
            subjects: [
              { id: 1, already_seen: false, retired: false },
              { id: 2, already_seen: true, retired: false },
              { id: 3, already_seen: true, retired: true }
            ]
          })
        }),
        http.get('https://www.zooniverse.org/api/subjects/selection', ({ request }) => {
          return HttpResponse.json({
            subjects: [
              { id: 1, already_seen: false, retired: false },
              { id: 2, already_seen: true, retired: false },
              { id: 3, already_seen: true, retired: true }
            ]
          })
        }),
      ],
    },
  }
}

export function Default(args) {
  const { ...props } = args
  return <SubjectPicker {...props} />
}
Default.args = {
  active: true,
  baseUrl: '/projects/test-owner/test-project/classify/workflow/12345',
  closeFn: e => true,
  subjectSet: {
    id: '15582',
    display_name: 'Anti-Slavery Letters: 1800-1839',
    metadata: {
      indexFields: 'date,title,creators'
    }
  },
  workflow: {
    id: '5329',
    display_name: 'Transcribe Text (Main Workflow)'
  }
}

export function Tablet(args) {
  const { ...props } = args
  return <SubjectPicker {...props} />
}
Tablet.parameters = { viewport: { defaultViewport: 'ipad' } }
Tablet.args = {
  active: true,
  baseUrl: '/projects/test-owner/test-project/classify/workflow/12345',
  closeFn: e => true,
  subjectSet: {
    id: '15582',
    display_name: 'Anti-Slavery Letters: 1800-1839',
    metadata: {
      indexFields: 'date,title,creators'
    }
  },
  workflow: {
    id: '5329',
    display_name: 'Transcribe Text (Main Workflow)'
  }
}
