import { composeStory } from "@storybook/react"
import { render, screen } from "@testing-library/react"
import Meta, { Default } from "./VolumetricTask.stories"

describe("VolumetricTask", function () {
  const DefaultStory = composeStory(Default, Meta)

  describe("when it renders", function () {
    it("should show the instruction", function () {
      render(<DefaultStory />)
      expect(screen.getByText("Volumetric the task")).to.be.ok()
    })

    it("should show the label text", function () {
      render(<DefaultStory />)
      expect(screen.getByText("3D Viewer")).to.be.ok()
    })

    it("should show the classification count", function () {
      render(<DefaultStory />)
      expect(screen.getByText("InputStatus.drawn")).to.be.ok()
    })
  })
})
