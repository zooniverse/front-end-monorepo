import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// TODO fix issue with react-swipe
// import ReactSwipe from 'react-swipe';
// TODO fix issue with animated-scrollto
// import animatedScrollTo from 'animated-scrollto';

class StepThrough extends Component {
  constructor(props) {
    super(props);
    this.goPrevious = this.goPrevious.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goTo = this.goTo.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.renderControls = this.renderControls.bind(this);
    this.state = {
      render: false,
      step: props.defaultStep,
    };
  }

  // componentDidMount() {
  //   addEventListener('keydown', this.handleKeyDown);
  //   this.swiper.swipe.setup();
  // }

  // componentWillUnmount() {
  //   removeEventListener('keydown', this.handleKeyDown);
  // }

  goPrevious() {
    this.swiper.swipe.prev();
    this.handleScroll();
  }

  goNext() {
    this.swiper.swipe.next();
    this.handleScroll();
  }

  goTo(index) {
    this.swiper.swipe.slide(index);
    this.handleScroll();
  }

  handleStep(total, index) {
    this.setState({
      step: (index % total + total) % total,
    });
  }

  handleKeyDown(e) {
    switch (e.which) {
      // left
      case 37:
        e.preventDefault();
        this.goPrevious();
        break;
      // right
      case 39:
        e.preventDefault();
        this.goNext();
        break;
    }
  }

  handleScroll() {
    const reactSwipeNode = this.swiper;
    // setTimeout(animatedScrollTo(reactSwipeNode, reactSwipeNode.offsetTop, 0), 500);
  }

  renderControls(childrenCount) {
    if (childrenCount === 1) {
      return null;
    } else {
      const allSteps = Array.from(Array(childrenCount).keys());
      return (
        <div className="step-through-controls">
          <button
            type="button"
            className="step-through-direction step-through-previous"
            aria-label="Previous step"
            title="Previous"
            disabled={this.state.step === 0}
            onClick={this.goPrevious}
          >
            ◀
          </button>

          <span className="step-through-pips">
            {allSteps.map(thisStep =>
              <label key={thisStep} className="step-through-pip" title={`Step ${thisStep + 1}`}>
                <input
                  type="radio"
                  className="step-through-pip-input"
                  aria-label={`Step ${thisStep + 1} of ${childrenCount}`}
                  checked={thisStep === this.state.step}
                  autoFocus={thisStep === this.state.step}
                  onChange={this.goTo.bind(this, thisStep)}
                />
                <span className="step-through-pip-number">{thisStep + 1}</span>
              </label>
            )}
          </span>

          <button
            type="button"
            className="step-through-direction step-through-next"
            aria-label="Next step"
            title="Next"
            disabled={this.state.step === childrenCount - 1}
            onClick={this.goNext}
          >
            ▶
          </button>

        </div>
      );
    }
  }

  render() {
    const childrenCount = React.Children.count(this.props.children);
    const swipeOptions = {
      startSlide: this.state.step,
      continuous: false,
      callback: this.handleStep.bind(this, childrenCount),
    };
    // return (
    //   <div className="step-through" className={this.props.className} style={this.props.style}>
    //     <ReactSwipe
    //       ref={(el) => { this.swiper = el; }}
    //       className="step-through-content"
    //       swipeOptions={swipeOptions}
    //     >
    //       {this.props.children}
    //     </ReactSwipe>
    //     {this.renderControls(childrenCount)}
    //   </div>
    // );
  }
}

StepThrough.propTypes = {
  defaultStep: PropTypes.number,
}

StepThrough.defaultProps = {
  defaultStep: 0,
}

export default StepThrough;
