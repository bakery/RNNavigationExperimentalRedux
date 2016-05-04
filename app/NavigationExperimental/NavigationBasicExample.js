/**
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

const React = require('react');
const ReactNative = require('react-native');
const {
  NavigationExperimental,
  ScrollView,
  StyleSheet,
} = ReactNative;
const NavigationExampleRow = require('./NavigationExampleRow');
const {
  RootContainer: NavigationRootContainer
} = NavigationExperimental;
const BasicExampleReducer = require('../reducers/BasicExampleReducer');
const ReduxNavigationRootContainer = require('../lib/ReduxNavigationRootContainer');
const Redux = require('react-redux');
const { connect } = Redux;

const NavigationBasicExample = React.createClass({
  render: function() {
    return (
      <ReduxNavigationRootContainer
        reducer={BasicExampleReducer}
        navigationState={this.props.navigation}
        ref={navRootContainer => { this.navRootContainer = navRootContainer; }}
        renderNavigation={(navState, onNavigate) => {
          if (!navState) { return null; }
          return (
            <ScrollView style={styles.topView}>
              <NavigationExampleRow
                text={`Current page: ${navState.children[navState.index].key}`}
              />
              <NavigationExampleRow
                text={`Push page #${navState.children.length}`}
                onPress={() => {
                  onNavigate({ type: 'push', key: 'page #' + navState.children.length });
                }}
              />
              <NavigationExampleRow
                text="pop"
                onPress={() => {
                  onNavigate(NavigationRootContainer.getBackAction());
                }}
              />
              <NavigationExampleRow
                text="Exit Basic Nav Example"
                onPress={this.props.onExampleExit}
              />
            </ScrollView>
          );
        }}
      />
    );
  },

  handleBackAction: function() {
    return (
      this.navRootContainer &&
      this.navRootContainer.handleNavigation(NavigationRootContainer.getBackAction())
    );
  },

});

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#E9E9EF',
    flex: 1,
    paddingTop: 30,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    navigation: state.BasicExample
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavigationBasicExample);
