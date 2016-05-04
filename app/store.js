import { createStore, compose } from 'redux';
import createReducer from './reducers';
import devTools from 'remote-redux-devtools';

function configureStore(initialState = {}) {
  const createStoreWithMiddleware = compose(devTools())(createStore);
  return createStoreWithMiddleware(createReducer(), initialState);
}

module.exports = configureStore;
