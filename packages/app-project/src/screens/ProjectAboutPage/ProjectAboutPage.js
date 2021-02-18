import { Box } from "grommet";
import React from "react";
import Announcements from "@components/Announcements"
import ProjectHeader from "@components/ProjectHeader"
import ZooHeaderWrapper from "@components/ZooHeaderWrapper"
import { ZooFooter, Markdownz } from "@zooniverse/react-components"

function ProjectAboutPage({ aboutPageData }) {

  const { content = "", title = "" } = aboutPageData

  return (
    <Box>
      <ZooHeaderWrapper />
      <ProjectHeader />
      <Announcements />
      <Box
        margin={{ left: "large", right: "large" }}
        width={{ max: "xxlarge" }}
      >
        <Markdownz>{content}</Markdownz>
      </Box>
      <ZooFooter />
    </Box>
  )
}

export default ProjectAboutPage
