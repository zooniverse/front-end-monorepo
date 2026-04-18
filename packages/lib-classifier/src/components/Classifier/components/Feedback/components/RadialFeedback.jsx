import { node, number, shape, string } from 'prop-types'

import { useStores } from '@hooks'
import FeedbackMark from '@store/feedback/strategies/drawing/radial/feedback-mark'

import SingleImageViewerContainer from '../../SubjectViewer/components/SingleImageViewer/SingleImageViewerContainer'

export const FEEDBACK_COLORS = {
  failure: "#f56F5D",
  success: "#4EAF79",
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
  return applicableRules.some((rule) => {
    return rule.successfulClassifications?.includes(marking)
  });
}

/**
 * Filters annotations for drawing task annotations and adds feedback colour
 * based on whether the mark matches any successful classifications in the applicable rules.
 * @typedef {Object} Annotation - A user's annotation on the subject, which may contain one or more marks.
 * @property {string} taskType - The type of annotation, e.g. 'drawing'.
 * @property {Marking[]} value - An array of marks made by the user. Each mark may have different properties depending on the tool used.
 * 
 * @typedef {Object} Rule - A feedback rule that can be applied to a classification.
 * @property {string} id - Unique identifier for the rule.
 * @property {boolean} success - Whether the rule indicates a successful classification.
 * @property {Marking[]} successfulClassifications - An array of marks that are considered successful classifications for this rule.
 * @property {string} tolerance - The allowed distance from the successful classifications for a mark to be considered successful.
 * @property {string} x - The x-coordinate for the center of the radial feedback.
 * @property {string} y - The y-coordinate for the center of the radial feedback.
 * @property {boolean} [hideSubjectViewer] - Optional flag to indicate whether the subject viewer should be hidden when this rule is applicable.
 * 
 * @typedef {Object} Marking - An individual mark made by the user, which may have different properties depending on the tool used.
 * @property {string} id - Unique identifier for the mark.
 * @property {string} toolType - The type of drawing tool used to make the mark, e.g. 'point', 'ellipse', 'circle'.
 * @property {number} x - The x-coordinate of the mark (for point tools).
 * @property {number} y - The y-coordinate of the mark (for point tools).
 * @property {number} x_center - The x-coordinate of the center of the mark (for shape tools like circle and ellipse).
 * @property {number} y_center - The y-coordinate of the center of the mark (for shape tools like circle and ellipse).
 * @property {number} r - The radius of the mark (for circle tools).
 * @property {number} rx - The x-radius of the mark (for ellipse tools).
 * @property {number} ry - The y-radius of the mark (for ellipse tools).
 * @property {React.Component} toolComponent - The React component used to render this mark.
 * 
 * @typedef {Object} AnnotatedMark - An individual mark with feedback colour and tool component for rendering.
 * @property {string} id - Unique identifier for the mark.
 * @property {Marking} mark - The original marking made by the user.
 * @property {string} color - The feedback colour for this mark, determined by whether it matches a successful classification in the applicable rules.
 * 
 * @param {Annotation[]} annotations
 * @param {Rule[]} applicableRules 
 * @returns {AnnotatedMark[]} An array of mark objects with feedback colours.
 */
function getAnnotatedMarks(annotations = [], applicableRules = []) {
  const annotatedMarks = [];

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

        return {
          id: marking.id,
          mark: marking,
          color,
        };
      });
    annotatedMarks.push(...marks);
  });
  return annotatedMarks;
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

/**
 * Render a mark's tool component (`Point`, `Circle`, etc.) with a stroke colour based on feedback success or failure.
 * @param {props}
 * @param {AnnotatedMark} props.marking - An individual mark with feedback colour and tool component for rendering.
 * @param {string} props.marking.color - The feedback colour for this mark.
 * @param {Marking} props.marking.mark - The original drawn mark.
 * @returns {JSX.Element|null} A feedback mark to be rendered on the subject viewer, or null if the tool component is not found.
 */
function AnnotationFeedback({ marking }) {
  const { mark, color } = marking;
  const MarkComponent = mark.toolComponent

  if (!MarkComponent) {
    return null;
  }

  return (
    <g
      fill="rgba(0, 0, 0, 0.5)"
      pointerEvents="none"
      stroke={color}
      transform={`translate(${mark.x}, ${mark.y})`}
    >
      <MarkComponent mark={mark} />
    </g>
  );
}

AnnotationFeedback.propTypes = {
  marking: shape({
    color: string.isRequired,
    mark: shape({
      x: number.isRequired,
      y: number.isRequired,
      toolComponent: node.isRequired,
      toolType: string.isRequired,
    }).isRequired,
  }).isRequired,
};

function storeMapper(classifierStore) {
  const {
    classifications: { currentAnnotations: annotations },
    feedback: { applicableRules },
    subjectViewer: { loadingState },
  } = classifierStore;

  return {
    annotations,
    applicableRules,
    loadingState,
  };
}

export default function RadialFeedback() {
  const {
    annotations = [],
    applicableRules = [],
    loadingState,
  } = useStores(storeMapper);

  const annotatedMarks = getAnnotatedMarks(
    annotations,
    applicableRules
  );
  const ruleMarks = getRuleMarks(applicableRules);
  const feedbackMarks = [
    ...annotatedMarks.map((marking) => (
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
