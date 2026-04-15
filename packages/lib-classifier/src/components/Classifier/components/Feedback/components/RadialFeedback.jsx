import { node, number, shape, string } from "prop-types";

import { useStores } from "@hooks";
import FeedbackMark from "@store/feedback/strategies/drawing/radial/feedback-mark";

import SingleImageViewerContainer from "../../SubjectViewer/components/SingleImageViewer/SingleImageViewerContainer";

const FEEDBACK_COLORS = {
  failure: "#C23D2A",
  success: "#1B7F46",
};

const FEEDBACK_MARK = {
  tool: {
    size: "small",
  },
};

function toNumber(value) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function hasXYCoords(marking) {
  return Number.isFinite(marking?.x) && Number.isFinite(marking?.y);
}

function isSuccessfulMark(marking, applicableRules = []) {
  return applicableRules.some((rule) => {
    return rule.successfulClassifications?.some((successfulClassification) => {
      return (
        successfulClassification.x === marking.x &&
        successfulClassification.y === marking.y
      );
    });
  });
}

function getAnnotationMarks(annotations = [], frame = 0, applicableRules = []) {
  const pointMarks = [];

  annotations.forEach((annotation) => {
    if (annotation.taskType !== "drawing") {
      return;
    }
    const marks = annotation.value
      // Only consider marks that have x and y coordinates.
      .filter((marking) => hasXYCoords(marking))
      // Add a colour to each mark based on success/failure.
      .map((marking) => {
        const color = isSuccessfulMark(marking, applicableRules)
          ? FEEDBACK_COLORS.success
          : FEEDBACK_COLORS.failure;

        return { ...marking, color };
      });
    pointMarks.push(...marks);
  });
  return pointMarks;
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
      <MarkComponent mark={FEEDBACK_MARK} />
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

  const annotationMarks = getAnnotationMarks(
    annotations,
    frame,
    applicableRules
  );
  if (applicableRules.some(rule => rule.hideSubjectViewer)) {
    return null
  }
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
