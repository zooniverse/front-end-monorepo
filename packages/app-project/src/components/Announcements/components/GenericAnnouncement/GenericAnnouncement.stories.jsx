import GenericAnnouncement from './GenericAnnouncement'

const announcement = 'Neque magnis massa cum elementum dignissim nibh congue facilisis suscipit dictumst, porta hac porttitor praesent purus velit nullam nascetur eu ultricies libero, ipsum viverra molestie orci mollis faucibus habitant a placerat.'

export default {
  title: 'Project App / Screens / Project Home / Announcements / GenericAnnouncement',
  component: GenericAnnouncement,
  args: {
    announcement: announcement,
    color: 'neutral-2'
  }
}

export const Default = {}

export const WithALink = {
  args: {
    ...Default.args,
    announcement: 'Please visit our external [link](https://www.example.com).'
  }
}

export const Dismissable = {
  args: {
    ...Default.args,
    dismissable: true
  }
}