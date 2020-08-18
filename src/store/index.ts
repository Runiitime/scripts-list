import { combineReducers } from 'redux';
import scripts from "./scripts/slice";
import { IScripts } from './scripts/types';

export interface IState {
  scripts: IScripts
};

export default combineReducers({
  scripts: scripts.reducer
});