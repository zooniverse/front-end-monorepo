import FinishedForTheDay from "./FinishedForTheDay"

export default {
  title: 'Project App / Screens / Classify / Finished For The Day',
  component: FinishedForTheDay,
  args: {
    imageSrc: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg',
    linkHref: '',
    projectName: 'Mock Project',
    screenSize: 'medium',
    theme: {
      dark: false
    }
  }
}

export const Default = (props) => {
  return <FinishedForTheDay {...props} />
}
