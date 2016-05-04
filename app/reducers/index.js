import ExampleTabsReducer from './ExampleTabsReducer';
import AnimatedExampleReducer from './AnimatedExampleReducer';
import BasicExampleReducer from './BasicExampleReducer';
import CardStackExampleReducer from './CardStackExampleReducer';
import CompositionExampleReducer from './CompositionExampleReducer';
import { combineReducers } from 'redux';
// XX: Do not rename this variable if you want reducer generator
// to keep working properly (and you do want that, right?)
const applicationReducers = {
  ExampleTabs: ExampleTabsReducer,
  AnimatedExample: AnimatedExampleReducer,
  BasicExample: BasicExampleReducer,
  CardStackExample: CardStackExampleReducer,
  CompositionExample: CompositionExampleReducer
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
