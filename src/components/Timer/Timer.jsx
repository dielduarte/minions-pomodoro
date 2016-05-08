import React from "react";
import ReactDom from "react-dom";
import CircularProgress from 'material-ui/lib/circular-progress';
import moment from "moment";


class Timer extends React.Component {

    constructor() {
        super();
        this.state = {
            time: 10,
            circularValue: 0
        };

        this.counter  = this.counter.bind(this);
        this.setCircularValue = this.setCircularValue.bind(this);
    }

    componentDidMount() {
        setInterval(this.counter, 1000);
    }

    counter() {
        let newTime = this.state.time - 1;

        if(newTime < 0)
            return false;

        this.setState({
            time: newTime
        });

        this.setCircularValue();
    }

    setCircularValue() {
        let currentTime = this.state.time;
        let newCircularValue = (100 - ((currentTime * 100)/10));

        this.setState({
            circularValue: newCircularValue
        });
    }

    showTime(seconds) {
        let time = moment.duration(seconds, 'seconds');
        let minutesTime = Math.floor(time.minutes());
        let secondsTime = Math.floor(time.seconds());

        if(secondsTime.toString().length  == 1)
            secondsTime = '0' + secondsTime;

        if(minutesTime.toString().length  == 1)
            minutesTime = '0' + minutesTime;

        return minutesTime + ':' + secondsTime;
    }

    render() {
        return (
            <div>
                <CircularProgress mode="determinate" value={this.state.circularValue} size="5"/>
                {this.showTime(this.state.time)}
            </div>
        );
    }
}


export default Timer;
