import { combineReducers } from 'redux'
import scripts, { IScripts } from "./scripts/slice"

export interface IState {
  scripts: IScripts
}

export default combineReducers({
  scripts: scripts.reducer
})