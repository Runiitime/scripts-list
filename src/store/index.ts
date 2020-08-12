import { combineReducers } from 'redux'
import scripts, { IScripts } from "./scripts/slice"
// import { enableMapSet } from 'immer'
// enableMapSet()
export interface IState {
  scripts: IScripts
}

export default combineReducers({
  scripts: scripts.reducer
})