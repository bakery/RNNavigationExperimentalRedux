/*
 *
 * App
 *
 */

import React, { Component, View } from 'react-native';
import NavigationExperimentalExample from '../NavigationExperimental/NavigationExperimentalExample';
import styles from './styles';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationExperimentalExample />
      </View>
    );
  }
}


export default App;
