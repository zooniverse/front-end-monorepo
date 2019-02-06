import PropTypes from 'prop-types';
import React from 'react';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';
import FrameViewer from '../../../../components/frame-viewer';
import ModalFocus from '../../../../components/modal-focus';

/* eslint-disable max-len */
counterpart.registerTranslations('en', {
  FeedbackModal: {
    title: 'Feedback',
    ok: 'OK'
  }
});
/* eslint-enable max-len */

class FeedbackModal extends React.Component {
  constructor() {
    super();
    this.closeButton = null;
  }

  componentDidMount() {
    const { closeButton } = this;
    closeButton.focus && closeButton.focus();
  }

  render() {
    const { messages, subjectViewerProps } = this.props;
    return (
      <ModalFocus className="feedbackmodal">
        <Translate content="FeedbackModal.title" component="h2" />
        {subjectViewerProps && (<FrameViewer {...subjectViewerProps} />)}
        <ul>
          {messages.map(message =>
            <li key={Math.random()}>
              {message}
            </li>
          )}
        </ul>

        <div className="buttons">
          <button
            className="standard-button"
            type="submit"
            ref={(button) => { this.closeButton = button; }}
          >
            <Translate content="FeedbackModal.ok" />
          </button>
        </div>
      </ModalFocus>
    );
  }
}

FeedbackModal.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
  subjectViewerProps: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default FeedbackModal;
