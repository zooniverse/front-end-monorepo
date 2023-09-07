import GenericAnnouncement from './GenericAnnouncement'
import { AnnouncementText } from './GenericAnnouncement.mock'
// import readme from './README.md'

export default {
  title: 'Project App / Screens / Project Home / Announcements / GenericAnnouncement',
  component: GenericAnnouncement,
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export const Default = () => (
  <GenericAnnouncement
    announcement={AnnouncementText}
    color='neutral-2'
    dismissable={false}
    closeFn={() => {}}
  />
)

export const Dismissable = () => (
  <GenericAnnouncement
    announcement={AnnouncementText}
    color='neutral-2'
    dismissable={true}
		closeFn={() => {}} 
  />
)
