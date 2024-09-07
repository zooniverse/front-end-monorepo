export const AnnotationView = ({ annotation, annotations, index }) => {
  function annotationActive() {
    annotations.actions.annotation.active({ index });
  }

  function annotationDelete(e) {
    e.stopPropagation();
    annotations.actions.annotation.remove({ index });
  }

  const color = annotations.config.activeAnnotation === index ? "#555" : "#222";

  return (
    <div
      style={{ padding: "20px", backgroundColor: color }}
      onClick={annotationActive}
    >
      <p>Label: {annotation.label}</p>
      <p>Threshold: {annotation.threshold}</p>
      <p>Points: {annotation.points.active.length}</p>
      <p onClick={annotationDelete}>Delete Annotation</p>
    </div>
  );
};
