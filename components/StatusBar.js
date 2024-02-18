import React from 'react';
import { Constants, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Animated from 'react-native-animatable';

export default class Status extends React.Component {
  state = {
    info: 'none',
  };

  componentDidMount() {
    NetInfo.fetch().then((status) => {
      this.updateStatus(status.isConnected);
    });
    this.subscription = NetInfo.addEventListener((status) => {
      this.updateStatus(status.isConnected);
    });
  }

  componentWillUnmount() {
    this.subscription && this.subscription();
  }

  updateStatus(isConnected) {
    this.setState({ info: isConnected ? 'connected' : 'none' });
  }

  render() {
    const { info } = this.state;
    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? '#255C99' : 'red';

    if (Platform.OS === 'ios') {
      return (
        <Animated.View animation={isConnected ? 'fadeOut' : 'fadeIn'} 
        duration={10000} style={[styles.status, { backgroundColor }]}>
          <StatusBar
            backgroundColor={backgroundColor}
            barStyle={isConnected ? 'dark-content' : 'light-content'}
            animated={true}
          />
        </Animated.View>
      );
    } else {
      return (
        <Animated.View animation={isConnected ? 'fadeOut' : 'fadeIn'} duration={5000} style={styles.messageContainer} pointerEvents="none">
          {!isConnected && (
            <View style={[styles.bubble, styles.bubbleFront]}>
              <Text style={styles.text}>No network connection</Text>
            </View>
          )}
          <StatusBar
            backgroundColor={backgroundColor}
            barStyle={isConnected ? 'dark-content' : 'light-content'}
            animated={true}
          />
        </Animated.View>
      );
    }
  }
}

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    flex: 1,
    zIndex: 10001,
    height: statusHeight + 80,
  },
  messageContainer: {
    flex: 1,
    position: 'absolute',
    top: statusHeight,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
    zIndex: 10001,
  },
  bubble: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0, 
    zIndex: 10002, 
  },
  bubbleFront: {
    flex: 1,
    top: statusHeight + 20, 
    zIndex: 10002, 
  },
  text: {
    flex: 1,
    color: 'white',
  },
});
