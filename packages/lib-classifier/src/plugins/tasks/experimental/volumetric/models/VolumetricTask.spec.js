import VolumetricTask from "@plugins/tasks/experimental/volumetric"

describe("Model > VolumetricTask", function () {
  const volumetricTask = {
    taskKey: "T0",
    type: "volumetric",
  }

  const singleChoiceTask = {
    answers: [
      { label: "yes", next: "S2" },
      { label: "no", next: "S3" },
    ],
    strings: {
      question: "Do you exist?",
    },
    required: "",
    taskKey: "T1",
    type: "single",
  }

  const mockAnnotationsSnapshot = [{
    label: `Test Annotation`,
    threshold: 15,
    points: {
      active: [],
      connected: []
    }
  }]

  it("should exist", function () {
    const task = VolumetricTask.TaskModel.create(volumetricTask)
    expect(task).to.exist
    expect(task).to.be.an("object")
  })

  it("should error for invalid tasks", function () {
    let errorThrown = false
    try {
      VolumetricTask.TaskModel.create(singleChoiceTask)
    } catch (e) {
      errorThrown = true
    }
    expect(errorThrown).to.equal(true)
  })

  describe("Views > defaultAnnotation", function () {
    let task

    before(function () {
      task = VolumetricTask.TaskModel.create(volumetricTask)
    })

    it("should be a valid annotation", function () {
      const annotation = task.defaultAnnotation()
      expect(annotation.id).to.exist
      expect(annotation.task).to.equal("T0")
      expect(annotation.taskType).to.equal("volumetric")
    })

    it("should generate unique annotations", function () {
      const firstAnnotation = task.defaultAnnotation()
      const secondAnnotation = task.defaultAnnotation()
      expect(firstAnnotation.id).to.not.equal(secondAnnotation.id)
    })
  })

  describe("with an annotation", function () {
    let annotation
    let task

    before(function () {
      task = VolumetricTask.TaskModel.create(volumetricTask)
      annotation = task.defaultAnnotation()
    })

    it("should start up with an empty array", function () {
      expect(annotation.value).to.deep.equal([])
    })

    it("should update annotations", function () {
      annotation.update(mockAnnotationsSnapshot);
      expect(annotation.value).to.deep.equal(mockAnnotationsSnapshot)
    })
  })
})
