import React from "react";
import ReactDom from "react-dom";
import CircularProgress from 'material-ui/lib/circular-progress';
import moment from "moment";
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import SvgIcon from 'material-ui/lib/svg-icon';


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
        const styles = {
            card: {
                'margin': '0 auto',
                'width': '320px'
            },
            counter: {
                'margin': '150px 135px',
            },
            time: {
                'position': 'relative',
                'margin': '0 auto',
                'display': 'block',
                'width': '100px',
                'text-align': 'center',
                'font-size': '40px',
                'top': '-191px',
            }
        };

        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader
                        title="Pomodoro reactive"
                    />
                    <div>
                        <CircularProgress style={styles.counter} mode="determinate" value={this.state.circularValue} size="5"/>
                        <span style={styles.time}>
                            {this.showTime(this.state.time)}
                        </span>
                    </div>
                    <CardActions>
                        <FlatButton
                            label="Play" />
                        <FlatButton
                            label="Stop"/>
                    </CardActions>
                </Card>

            </div>
        );
    }
}


export default Timer;
