import React from "react";
import ReactDom from "react-dom";
import Timer from "./components/Timer/Timer.jsx";


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class PomodoroReactive extends React.Component {
  render() {
    return (
     <div> <Timer /> </div>
    );
  }
}

ReactDom.render(<PomodoroReactive />, document.getElementById('app'));
