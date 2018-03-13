import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { robotsReducer } from './modules/robots';
import { recycleRobotsReducer } from './modules/recycleRobots';
import { IStore } from './IStore';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  robots: robotsReducer,
  recycleRobots: recycleRobotsReducer,
  reduxAsyncConnect: reducer,
});

export default rootReducer;
