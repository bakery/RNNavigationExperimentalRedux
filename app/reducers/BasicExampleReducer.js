const ReactNative = require('react-native');
const {
  NavigationExperimental,
} = ReactNative;
const {
  Reducer: NavigationReducer,
} = NavigationExperimental;

const BasicExampleReducer = NavigationReducer.StackReducer({
  getPushedReducerForAction: (action) => {
    if (action.type === 'push') {
      return (state) => state || {key: action.key};
    }
    return null;
  },
  getReducerForState: (initialState) => (state) => state || initialState,
  initialState: {
    key: 'BasicExampleStackKey',
    index: 0,
    children: [
      {key: 'First Route'},
    ],
  },
});

module.exports = BasicExampleReducer;
