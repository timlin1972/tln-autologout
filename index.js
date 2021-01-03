import React from 'react';

class Autologout extends React.Component {
  constructor(props) {
    super(props);

    this.timer = this.timer.bind(this);

    this.idleTime = 0;
    this.countdown = null;

    this.state = {
    };
  }

  componentDidMount() {
    const { debug } = this.props;

    this.countdown = setInterval(this.timer, debug ? 1000 : 60 * 1000);

    // eslint-disable-next-line no-undef
    $(document).mousemove(() => { this.idleTime = 0; });
    // eslint-disable-next-line no-undef
    $(document).keypress(() => { this.idleTime = 0; });
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  timer() {
    const { logoutTimeout, logoutUser, debug } = this.props;

    if (debug) console.log(`timer hits: ${this.idleTime}/${logoutTimeout}`);

    this.idleTime += 1;
    if (logoutTimeout && (logoutTimeout !== 0) && (this.idleTime >= logoutTimeout)) {
      clearInterval(this.countdown);
      logoutUser();
    }
  }

  render() {
    return (null);
  }
}

export default (Autologout);
