/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';

const NavigationExampleRow = require('./NavigationExampleRow');
const React = require('react');
const ReactNative = require('react-native');

const {
  NavigationExperimental,
  StyleSheet,
  ScrollView,
} = ReactNative;

const {
  CardStack: NavigationCardStack
} = NavigationExperimental;

const CardStackExampleReducer = require('../reducers/CardStackExampleReducer');
const ReduxNavigationRootContainer = require('../lib/ReduxNavigationRootContainer');
const Redux = require('react-redux');
const { connect } = Redux;

class NavigationCardStackExample extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {isHorizontal: true};
  }

  componentWillMount() {
    this._renderNavigation = this._renderNavigation.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._toggleDirection = this._toggleDirection.bind(this);
  }

  render() {
    return (
      <ReduxNavigationRootContainer
        reducer={CardStackExampleReducer}
        navigationState={this.props.navigation}
        renderNavigation={this._renderNavigation}
        style={styles.main}
      />
    );
  }

  _renderNavigation(navigationState, onNavigate) {
    return (
      <NavigationCardStack
        direction={this.state.isHorizontal ? 'horizontal' : 'vertical'}
        navigationState={navigationState}
        onNavigate={onNavigate}
        renderScene={this._renderScene}
        style={styles.main}
      />
    );
  }

  _renderScene(/*NavigationSceneRendererProps*/ props) {
    return (
      <ScrollView style={styles.scrollView}>
        <NavigationExampleRow
          text={
            this.state.isHorizontal ?
            'direction = "horizontal"' :
            'direction = "vertical"'
          }
          onPress={this._toggleDirection}
        />
        <NavigationExampleRow
          text={'route = ' + props.scene.navigationState.key}
        />
        <NavigationExampleRow
          text="Push Route"
          onPress={() => {
            props.onNavigate({
              type: 'push',
              key: 'Route ' + props.scenes.length,
            });
          }}
        />
        <NavigationExampleRow
          text="Pop Route"
          onPress={() => {
            props.onNavigate({
              type: 'pop',
            });
          }}
        />
        <NavigationExampleRow
          text="Exit Card Stack Example"
          onPress={this.props.onExampleExit}
        />
      </ScrollView>
    );
  }

  _toggleDirection() {
    this.setState({
      isHorizontal: !this.state.isHorizontal,
    });
  }

}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scrollView: {
    marginTop: 64
  },
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    navigation: state.CardStackExample
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavigationCardStackExample);
