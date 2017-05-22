import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

class StopWatch extends Component {
  constructor() {
    super()
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={styles.footer}>
          {this.laps()}
        </View>
      </View>
    );
  }
  laps() {
    return (
      this.state.laps.map(function(time,index){
        return (
          <View style={styles.lap}>
          <Text style={styles.lapText}>
          Lap #{index+1}
          </Text>
          <Text style={styles.lapText}>
          {formatTime(time)}
          </Text>
          </View>
        );
      })
    );
  }
  startStopButton() {
    const style = this.state.running? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight underlayColor="gray" style={[style, styles.button]} onPress={this.handleStartPress.bind(this)}>
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    );
  }
  lapButton() {
    return (
      <TouchableHighlight underlayColor="gray" style={styles.button} onPress={this.handleLapPress.bind(this)}>
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    );
  }
  handleLapPress() {
    const lap = this.state.timeElapsed;
    this.setState({
      laps: this.state.laps.concat([lap])
    });
  }
  handleStartPress() {
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
