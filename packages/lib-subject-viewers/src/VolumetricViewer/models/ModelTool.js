export const ModelTool = () => {
  const toolModel = {
    annotations: null, // annotationsModel
    initialize: ({ annotations }) => {
      toolModel.annotations = annotations
    },
    events: {
      click: ({
        button = 0, // 0 = left, 1 = right, 2 = middle
        point, // absolute point from ModelViewer
        shiftKey = false // true/false
      }) => {
        // basically translates the interaction event to annotation data

        if (button === 0 && shiftKey) {
          // force creating a new annotation
          toolModel.annotations.actions.annotation.add({ point })
        } else if (button === 0) {
          // add point or create new annotation with point depending on state
          toolModel.annotations.actions.point.add({ point })
        }
      }
    }
  }

  return toolModel
}
