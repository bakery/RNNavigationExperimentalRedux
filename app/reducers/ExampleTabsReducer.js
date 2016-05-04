const ReactNative = require('react-native');
const {
  NavigationExperimental,
} = ReactNative;
const {
  Reducer: NavigationReducer,
} = NavigationExperimental;

const ExampleTabsReducer = NavigationReducer.TabsReducer({
  tabReducers: [
    (lastRoute) => lastRoute || {key: 'one'},
    (lastRoute) => lastRoute || {key: 'two'},
    (lastRoute) => lastRoute || {key: 'three'},
  ],
});

module.exports = ExampleTabsReducer;
