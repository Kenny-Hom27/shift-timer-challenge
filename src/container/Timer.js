import React, { Component } from "react";
import IndividualTime from "../component/IndividualTime";

class Timer extends Component {
  state = {
    timeRunning: false,
    timer: 0,
    savedTimes: [],
    highlightedSplit: ""
  };

  onStart = () => {
    const start = Date.now() - this.state.timer;
    clearInterval(this.interval)

    this.interval = setInterval(() => {
      this.setState(prevState => ({
        timer: Date.now() - start,
        timeRunning: !prevState.timeRunning
      }));
    });
  };

  addSplit = () => {
    const { timeRunning, savedTimes, timer } = this.state
    if (timeRunning && !savedTimes.includes(timer)) {
      this.setState(prevState => ({
        savedTimes: [...prevState.savedTimes, timer]
      }));
    }
  };

  resetSplit = time => {
    clearInterval(this.interval);

    this.setState(prevState => ({
      savedTimes: prevState.savedTimes.filter(t => t <= time),
      timer: time,
      highlightedSplit: time,
      timeRunning: !prevState.timeRunning
    }));

  };

  displayTimes = times => {
    return times.map((time, idx) => (
      <IndividualTime key={idx} time={time} resetSplit={this.resetSplit} highlightedSplit={this.state.highlightedSplit} />
    ));
  };

  resetTimer = () => {
    clearInterval(this.interval);

    this.setState({
      timeRunning: false,
      timer: 0,
      savedTimes: []
    });
  };

  render() {
    console.log(this.state.highlightedSplit)
    return (
      <div className="timer">
        <div className="timer__logo">
          <img
            src="http://static1.squarespace.com/static/5af303fe2971148f72a0c7f2/t/5af5edaeaa4a99c18c6ed27f/1550165404248/?format=1500w"
            alt="shift logo"
          />
        </div>
        <div className="timer__clock" onClick={this.onStart}>
          <div className="timer__seconds">{this.state.timer} ms</div>
        </div>
        <div className="timer__list">
          {this.displayTimes(this.state.savedTimes)}
        </div>

        <div className="timer__addsplit">
          <button className="timer__button" onClick={this.resetTimer}>
            Reset
          </button>
          <button className="timer__button" onClick={this.addSplit}>
            Add Split
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
