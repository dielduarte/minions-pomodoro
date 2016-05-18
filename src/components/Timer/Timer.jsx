import React from "react";
import CircularProgress from 'material-ui/lib/circular-progress';
import moment from "moment";
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import WorkIcon from 'material-ui/lib/svg-icons/action/work';
import RestaurantIcon from 'material-ui/lib/svg-icons/maps/restaurant-menu';
import AirlineIcon from 'material-ui/lib/svg-icons/notification/airline-seat-individual-suite';


class Timer extends React.Component {

    constructor() {
        super();
        this.state = {
            time: 1500,
            circularValue: 0,
            initialTime: 1500
        };

        this.interval = null;

        this.counter  = this.counter.bind(this);
        this.setCircularValue = this.setCircularValue.bind(this);
        this.stop = this.stop.bind(this);
        this.startInterval = this.startInterval.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    counter() {
        let newTime = this.state.time - 1;

        if(newTime < 0) {
            clearInterval(this.interval);
            this.startAlarm();
            return false;
        }

        this.setState({
            time: newTime
        });

        this.setCircularValue();
    }

    setCircularValue() {
        let currentTime = this.state.time;
        let newCircularValue = (100 - ((currentTime * 100)/this.state.initialTime));

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

    stop() {
        clearInterval(this.interval);
        this.setState({
            time: this.state.initialTime,
            circularValue: 0,
            initialTime: this.state.initialTime
        });
    }


    startInterval() {
        this.stop();
        this.interval = setInterval(this.counter, 1000);
    }

    setTime(timeInMs) {
        this.setState({
            time: timeInMs,
            circularValue: 0,
            initialTime: timeInMs
        });
    }

    startAlarm() {
        var audio = new Audio('assets/mp3/wakeup.mp3');
        audio.play();
    }

    render() {
        const styles = {
            card: {
                'margin': '0 auto',
                'width': '320px',
                'marginTop': '50px'
            },
            counter: {
                'margin': '150px 135px',
            },
            time: {
                'position': 'relative',
                'margin': '0 auto',
                'display': 'block',
                'width': '100px',
                'textAlign': 'center',
                'fontSize': '40px',
                'top': '-191px',
            },
            timersButtons: {
                'position': 'relative',
                'top': '-16px',
                'float': 'right'
            }
        };

        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader title="Minions pomodoro">
                        <div style={styles.timersButtons}>
                            <IconButton tooltip="Work Time" onClick={() => this.setTime(1500)}>
                                <WorkIcon />
                            </IconButton>
                            <IconButton tooltip="Coffee Time" onClick={() => this.setTime(300)}>
                                <RestaurantIcon />
                            </IconButton>

                            <IconButton tooltip="Sleep Time" onClick={() => this.setTime(900)}>
                                <AirlineIcon />
                            </IconButton>
                        </div>
                    </CardHeader>
                    <div>
                        <CircularProgress style={styles.counter} mode="determinate" value={this.state.circularValue} size="5"/>
                        <span style={styles.time}>
                            {this.showTime(this.state.time)}
                        </span>
                    </div>
                    <CardActions>
                        <FlatButton
                            label="Play" onClick={this.startInterval}/>
                        <FlatButton
                            icon={<stopIcon />} label="stop" onClick={this.stop}/>
                    </CardActions>
                </Card>

            </div>
        );
    }
}


export default Timer;
