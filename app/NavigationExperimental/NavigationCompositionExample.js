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
 *
 * @flow
 */
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const NavigationExampleRow = require('./NavigationExampleRow');
const NavigationExampleTabBar = require('./NavigationExampleTabBar');

const {
  NavigationExperimental,
  ScrollView,
  StyleSheet,
  View,
} = ReactNative;

const {
  CardStack: NavigationCardStack,
  Container: NavigationContainer,
  Header: NavigationHeader,
  View: NavigationView,
} = NavigationExperimental;


import type {
  NavigationParentState,
  NavigationSceneRenderer,
  NavigationSceneRendererProps,
} from 'NavigationTypeDefinition';

const CompositionExampleActions = require('../actions/CompositionExampleActions');
const {
  ExampleInfoAction, ExampleNotifProfileAction, ExampleExitAction
} = CompositionExampleActions;

import CompositionExampleReducer from '../reducers/CompositionExampleReducer';
const ReduxNavigationRootContainer = require('../lib/ReduxNavigationRootContainer');
const Redux = require('react-redux');
const { connect } = Redux;


function stateTypeTitleMap(pageState: any) {
  switch (pageState.type) {
    case 'ProfilePage':
      return 'Profile Page';
    case 'NotifsPage':
      return 'Notifications';
    case 'SettingsPage':
      return 'Settings';
    case 'InfoPage':
      return 'Info Page';
    case 'NotifProfilePage':
      return 'Page in Profile';
  }
}

class ExampleTabScreen extends React.Component {
  _renderCard: NavigationSceneRenderer;
  _renderHeader: NavigationSceneRenderer;
  _renderScene: NavigationSceneRenderer;

  componentWillMount() {
    this._renderHeader = this._renderHeader.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  render() {
    return (
      <NavigationCardStack
        style={styles.tabContent}
        navigationState={this.props.navigationState}
        renderOverlay={this._renderHeader}
        renderScene={this._renderScene}
      />
    );
  }
  _renderHeader(props: NavigationSceneRendererProps) {
    return (
      <NavigationHeader
        {...props}
        renderTitleComponent={this._renderTitleComponent}
      />
    );
  }

  _renderTitleComponent(props: NavigationSceneRendererProps) {
    return (
      <NavigationHeader.Title>
        {stateTypeTitleMap(props.scene.navigationState)}
      </NavigationHeader.Title>
    );
  }

  _renderScene(props: NavigationSceneRendererProps) {
    const {onNavigate} = props;
    return (
      <ScrollView style={styles.scrollView}>
        <NavigationExampleRow
          text="Open page"
          onPress={() => {
            onNavigate(ExampleInfoAction());
          }}
        />
        <NavigationExampleRow
          text="Open a page in the profile tab"
          onPress={() => {
            onNavigate(ExampleNotifProfileAction());
          }}
        />
        <NavigationExampleRow
          text="Exit Composition Example"
          onPress={() => {
            onNavigate(ExampleExitAction());
          }}
        />
      </ScrollView>
    );
  }
}
ExampleTabScreen = NavigationContainer.create(ExampleTabScreen);

class NavigationCompositionExample extends React.Component {
  render() {
    return (
      <ReduxNavigationRootContainer
        reducer={CompositionExampleReducer}
        navigationState={this.props.navigation}
        ref={navRootContainer => { this.navRootContainer = navRootContainer; }}
        renderNavigation={this.renderApp.bind(this)}
      />
    );
  }
  handleBackAction(): boolean {
    return (
      this.navRootContainer &&
      this.navRootContainer.handleNavigation(ReduxNavigationRootContainer.getBackAction())
    );
  }
  renderApp(navigationState: NavigationParentState, onNavigate: Function) {
    if (!navigationState) {
      return null;
    }
    return (
      <View style={styles.topView}>
        <ExampleMainView
          navigationState={navigationState}
          onExampleExit={this.props.onExampleExit}
        />
        <NavigationExampleTabBar
          tabs={navigationState.children}
          index={navigationState.index}
        />
      </View>
    );
  }
}

class ExampleMainView extends React.Component {
  _renderScene: NavigationSceneRenderer;

  componentWillMount() {
    this._renderScene = this._renderScene.bind(this);
  }

  render() {
    return (
      <NavigationView
        navigationState={this.props.navigationState}
        style={styles.tabsContent}
        renderScene={this._renderScene}
      />
    );
  }

  _renderScene(props: NavigationSceneRendererProps): ReactElement {
    const {scene} = props;
    return (
      <ExampleTabScreen
        key={'tab_screen' + scene.key}
        navigationState={scene.navigationState}
        onNavigate={this._handleNavigation.bind(this, scene.key)}
      />
    );
  }

  _handleNavigation(tabKey, action) {
    if (ExampleExitAction.match(action)) {
      this.props.onExampleExit();
      return;
    }
    this.props.onNavigate(action);
  }
}

ExampleMainView = NavigationContainer.create(ExampleMainView);

const styles = StyleSheet.create({
  topView: {
    flex: 1,
  },
  tabsContent: {
    flex: 1,
  },
  scrollView: {
    marginTop: NavigationHeader.HEIGHT
  },
  tabContent: {
    flex: 1,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    navigation: state.CompositionExample
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavigationCompositionExample);

