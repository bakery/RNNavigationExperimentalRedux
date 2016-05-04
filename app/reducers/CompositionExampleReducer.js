const ReactNative = require('react-native');
const CompositionExampleActions = require('../actions/CompositionExampleActions');

const {
  PageAction, ExampleProfilePageAction
} = CompositionExampleActions;

const {
  NavigationExperimental,
} = ReactNative;

const {
  Reducer: NavigationReducer,
} = NavigationExperimental;

const _jsInstanceUniqueId = '' + Date.now();

let _uniqueIdCount = 0;

function pageStateActionMap(action) {
  return {
    key: 'page-' + _jsInstanceUniqueId + '-' + (_uniqueIdCount++),
    type: action.type,
  };
}

const CompositionExampleReducer = NavigationReducer.TabsReducer({
  key: 'AppNavigationState',
  initialIndex: 0,
  tabReducers: [
    NavigationReducer.StackReducer({
      getPushedReducerForAction: (action) => {
        if (PageAction.match(action) && !ExampleProfilePageAction.match(action)) {
          return (state) => (state || pageStateActionMap(action));
        }
        return null;
      },
      initialState: {
        key: 'notifs',
        index: 0,
        children: [
          {key: 'base', type: 'NotifsPage'},
        ],
      },
    }),
    NavigationReducer.StackReducer({
      getPushedReducerForAction: (action) => {
        if (PageAction.match(action) && !ExampleProfilePageAction.match(action)) {
          return (state) => (state || pageStateActionMap(action));
        }
        return null;
      },
      initialState: {
        key: 'settings',
        index: 0,
        children: [
          {key: 'base', type: 'SettingsPage'},
        ],
      },
    }),
    NavigationReducer.StackReducer({
      getPushedReducerForAction: (action) => {
        if (PageAction.match(action) || ExampleProfilePageAction.match(action)) {
          return (state) => (state || pageStateActionMap(action));
        }
        return null;
      },
      initialState: {
        key: 'profile',
        index: 0,
        children: [
          {key: 'base', type: 'ProfilePage'},
        ],
      },
    }),
  ],
});

module.exports = CompositionExampleReducer;
