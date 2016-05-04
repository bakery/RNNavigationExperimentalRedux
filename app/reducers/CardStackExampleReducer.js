const ReactNative = require('react-native');

const {
  NavigationExperimental,
} = ReactNative;

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initial = {
  index: 0,
  key: 'exmaple',
  children: [{key: 'First Route'}],
};

const CardStackExampleReducer = (currentState = initial, action) => {
  switch (action.type) {
    case 'RootContainerInitialAction':
      return currentState;

    case 'push':
      return NavigationStateUtils.push(currentState, {key: action.key});

    case 'back':
    case 'pop':
      return currentState.index > 0 ?
        NavigationStateUtils.pop(currentState) :
        currentState;

    default:
      return currentState;
  }
};

module.exports = CardStackExampleReducer;
