import { node, number, shape, string } from "prop-types";

import { useStores } from "@hooks";
import FeedbackMark from "@store/feedback/strategies/drawing/radial/feedback-mark";

import SingleImageViewerContainer from "../../SubjectViewer/components/SingleImageViewer/SingleImageViewerContainer";

const FEEDBACK_COLORS = {
  failure: "#C23D2A",
  success: "#1B7F46",
};

const ALLOWED_TOOL_TYPES = ["point", "ellipse", "circle"]

function toNumber(value) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function isAllowedType(marking) {
  return ALLOWED_TOOL_TYPES.includes(marking?.toolType);
}

function isSuccessfulMark(marking, applicableRules = []) {
  const x = marking.x || marking.x_center
  const y = marking.y || marking.y_center
  return applicableRules.some((rule) => {
    return rule.successfulClassifications?.some((successfulClassification) => {
      return (
        successfulClassification.x === x &&
        successfulClassification.y === y
      );
    });
  });
}

function getAnnotationMarks(annotations = [], frame = 0, applicableRules = []) {
  const annotationMarks = [];

  annotations.forEach((annotation) => {
    if (annotation.taskType !== "drawing") {
      return;
    }
    const marks = annotation.value
      // Only consider marks that have x and y coordinates.
      .filter((marking) => isAllowedType(marking))
      // Add a colour to each mark based on success/failure.
      .map((marking) => {
        const color = isSuccessfulMark(marking, applicableRules)
          ? FEEDBACK_COLORS.success
          : FEEDBACK_COLORS.failure;
        const toolComponent = marking.toolComponent
        const x = marking.x || marking.x_center
        const y = marking.y || marking.y_center

        return { ...marking, color, toolComponent, x, y };
      });
    annotationMarks.push(...marks);
  });
  return annotationMarks;
}

function getRuleMarks(applicableRules = []) {
  return applicableRules
    .map((rule) => {
      const x = toNumber(rule.x);
      const y = toNumber(rule.y);
      const tolerance = toNumber(rule.tolerance);

      if (x === null || y === null || tolerance === null) {
        return null;
      }

      return {
        id: rule.id,
        success: rule.success,
        tolerance,
        x,
        y,
      };
    })
    .filter(Boolean);
}
function AnnotationFeedback({ marking }) {
  const MarkComponent = marking.toolComponent

  if (!MarkComponent) {
    return null;
  }

  return (
    <g
      fill="transparent"
      pointerEvents="none"
      stroke={marking.color}
      transform={`translate(${marking.x}, ${marking.y})`}
    >
      <MarkComponent mark={marking} />
    </g>
  );
}

AnnotationFeedback.propTypes = {
  marking: shape({
    x: number.isRequired,
    y: number.isRequired,
    color: string.isRequired,
    toolComponent: node.isRequired,
  }).isRequired,
};

function storeMapper(classifierStore) {
  const {
    classifications: { currentAnnotations: annotations },
    feedback: { applicableRules },
    subjectViewer: { frame, loadingState },
  } = classifierStore;

  return {
    annotations,
    applicableRules,
    frame,
    loadingState,
  };
}

export default function RadialFeedback() {
  const {
    annotations = [],
    applicableRules = [],
    frame = 0,
    loadingState,
  } = useStores(storeMapper);

  if (applicableRules.some(rule => rule.hideSubjectViewer)) {
    return null
  }

  const annotationMarks = getAnnotationMarks(
    annotations,
    frame,
    applicableRules
  );
  const ruleMarks = getRuleMarks(applicableRules);
  const feedbackMarks = [
    ...annotationMarks.map((marking) => (
      <AnnotationFeedback key={marking.id} marking={marking} />
    )),
    ...ruleMarks.map((ruleMark) => (
      <FeedbackMark key={`rule-${ruleMark.id}`} rule={ruleMark} />
    )),
  ];

  return (
    <SingleImageViewerContainer
      enableInteractionLayer={false}
      loadingState={loadingState}
      feedbackMarks={feedbackMarks}
    />
  );
}
