import { number, shape, string } from "prop-types";

import { Point } from "@plugins/drawingTools/components";

import { useStores } from "@hooks";
import FeedbackMark from "@store/feedback/strategies/drawing/radial/feedback-mark";

import SingleImageViewerContainer from "../../SubjectViewer/components/SingleImageViewer/SingleImageViewerContainer";

const FEEDBACK_COLORS = {
  failure: "#C23D2A",
  success: "#1B7F46",
};

const FEEDBACK_POINT_MARK = {
  tool: {
    size: "small",
  },
};

function toNumber(value) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function isPointMark(marking) {
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
      // Only consider point marks that match the current frame.
      .filter((marking) => {
        const matchingFrame =
          marking.frame === undefined || marking.frame === frame;

        return matchingFrame && isPointMark(marking);
      })
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
function FeedbackPoint({ point }) {
  return (
    <g
      fill="transparent"
      pointerEvents="none"
      stroke={point.color}
      transform={`translate(${point.x}, ${point.y})`}
    >
      <Point mark={FEEDBACK_POINT_MARK} />
    </g>
  );
}

FeedbackPoint.propTypes = {
  point: shape({
    x: number.isRequired,
    y: number.isRequired,
    color: string.isRequired,
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
  const ruleMarks = getRuleMarks(applicableRules);
  const feedbackMarks = [
    ...annotationMarks.map((marking) => (
      <FeedbackPoint key={marking.id} point={marking} />
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
