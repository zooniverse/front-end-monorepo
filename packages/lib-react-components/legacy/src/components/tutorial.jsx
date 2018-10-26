import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'modal-form/dialog';
import MediaCard from './media-card';
import { Markdown } from 'markdownz';
import apiClient from 'panoptes-client/lib/api-client';
import StepThrough from '../components/step-through';

const completedThisSession = {};
// TODO fix [window is undefined](https://github.com/zeit/next.js/wiki/FAQ) issue
// if (window && window.tutorialsCompletedThisSession) {
//   window.tutorialsCompletedThisSession = completedThisSession;
// }

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.previousActiveElement = document.activeElement;
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentWillUnmount() {
    this.handleUnmount();
  }

  handleNextClick() {
    this.stepThrough.goNext();
  }

  handleUnmount() {
    if (this.previousActiveElement.focus) {
      this.previousActiveElement.focus();
    }
    const now = new Date().toISOString();
    completedThisSession[this.props.tutorial.id] = now;

    if (this.props.user) {
      const projectPreferences = this.props.preferences;
      if (!projectPreferences.preferences) {
        projectPreferences.preferences = {};
      };
      if (!projectPreferences.preferences.tutorials_completed_at) {
        projectPreferences.preferences.tutorials_completed_at = {};
      };
      const changes = {};
      changes[`preferences.tutorials_completed_at.${this.props.tutorial.id}`] = now;
      projectPreferences.update(changes);
      projectPreferences.save();
    }
  }

  render() {
    const isIE = 'ActiveXObject' in window;
    let tutorialStyle;

    if (isIE) {
      tutorialStyle = { height: '85vh' };
    };

    return (
      <StepThrough ref={(el) => { this.stepThrough = el; }} className="tutorial-steps" style={tutorialStyle}>
        {this.props.tutorial.steps.map((step, i) => {
          if (!step._key) {
            step._key = Math.random();
          };
          let source;
          let button;

          if (this.props.media[step.media]) {
            source = this.props.media[step.media].src;
          };
          if (i === this.props.tutorial.steps.length - 1) {
            button = <button type="submit" className="major-button">Let’s go!</button>;
          } else {
            button = <button type="button" className="standard-button" onClick={this.handleNextClick}>Continue</button>;
          }

          return (
            <MediaCard key={step._key} className="tutorial-step" src={source}>
              <Markdown>{step.content}</Markdown>
              <hr />
              <p>
                {button}
              </p>
            </MediaCard>
          );
        })}
      </StepThrough>
    );
  }
};

Tutorial.checkIfCompleted = (tutorial, user, preferences) => {
  if (user) {
    window.prefs = preferences;
    if (preferences && preferences.preferences && preferences.preferences.tutorials_completed_at && preferences.preferences.tutorials_completed_at[tutorial.id]) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } else {
    return Promise.resolve(!!completedThisSession[tutorial.id]);
  }
};

Tutorial.startIfNecessary = (self, tutorial, user, preferences) => {
  if (tutorial) {
    self.checkIfCompleted(tutorial, user, preferences).then((completed) => {
      if (!completed) {
        self.start(self, tutorial, user, preferences);
      }
    });
  }
}

Tutorial.find = (workflow) => {
  if (workflow) {
    return apiClient.type('tutorials').get({ workflow_id: workflow.id })
      .then((tutorials) => {
        const onlyStandardTutorials = tutorials.filter((tutorial) => {
          return tutorial.kind === 'tutorial' || null;
        })
        return onlyStandardTutorials[0];
      })
  } else {
    return Promise.resolve(false)
  }
}

Tutorial.start = (TutorialComponent, tutorial, user, preferences) => {
  if (tutorial.steps.length !== 0) {
    const awaitTutorialMedia = tutorial.get('attached_images')
      .catch(() => {
        return [];
      })
      .then((mediaResources) => {
        const mediaByID = {};

        mediaResources.map((mediaResource) => {
          mediaByID[mediaResource.id] = mediaResource;
        });
        return mediaByID;
      });

    awaitTutorialMedia.then((mediaByID) => {
      Dialog.alert(<TutorialComponent tutorial={tutorial} media={mediaByID} preferences={preferences} user={user} />, {
        className: 'tutorial-dialog',
        required: true,
        closeButton: true
      })
      .catch(() => {
        return null;
      });
    });
  }
};

Tutorial.propTypes = {
  preferences: PropTypes.shape({
    preferences: PropTypes.object
  }),
  tutorial: PropTypes.shape({
    steps: PropTypes.array
  }),
  user: PropTypes.object
};

Tutorial.defaultProps = {
  media: {},
  preferences: null,
  tutorial: {
    steps: []
  },
  user: null,
};

export default Tutorial;
