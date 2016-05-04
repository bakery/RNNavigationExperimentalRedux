import { NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
const {
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

class ReduxNavigationRootContainer extends NavigationRootContainer {
  handleNavigation(action) {
    const { dispatch } = this.props;
    dispatch(action);
  }

  render() {
    const navigation = this.props.renderNavigation(
      this.props.navigationState,
      this.handleNavigation
    );
    return navigation;
  }
}

module.exports = connect(null, (dispatch) => {
  return { dispatch };
})(ReduxNavigationRootContainer);
