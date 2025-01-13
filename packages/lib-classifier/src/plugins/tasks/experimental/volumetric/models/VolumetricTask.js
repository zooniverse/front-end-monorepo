import cuid from "cuid"
import { types } from "mobx-state-tree"
import Task from "../../../models/Task"
import VolumetricAnnotation from "./VolumetricAnnotation"

const Volumetric = types
  .model("Volumetric", {
    annotation: types.safeReference(VolumetricAnnotation),
    type: types.literal("volumetric"),
  })
  .views((self) => ({
    defaultAnnotation(id = cuid()) {
      return VolumetricAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type,
      })
    },
  }))

const VolumetricTask = types.compose("VolumetricTask", Task, Volumetric)

export default VolumetricTask
