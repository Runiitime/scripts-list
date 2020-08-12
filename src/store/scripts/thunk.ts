import scriptsSlice, { IScriptItem, IDictionary } from './slice'
import { IState } from 'store/index'
import { scriptSelectors } from './selectors'

type GetStateFunc = () => IState;

export const setActiveId = (id: string): Function => (dispatch: Function): void => {
  dispatch(scriptsSlice.actions.changeActiveScriptId(id));
}

export const editScript = (script: IScriptItem): Function => (dispatch: Function, getState: GetStateFunc): void => {
  const state: IState = getState();
  // const scripts: IScriptItem[] = scriptSelectors(state).scripts();

  // const scriptsArray: [string, IScriptItem][] = Array.from(scripts)
  // let mapped = new Map<string, IScriptItem>()

  // scriptsArray.forEach(([id, value]): void => {
  //   const val: IScriptItem = id === script.id ? script : value
  //   mapped.set(id, val)
  // })
  // dispatch(scriptsSlice.actions.editScript(mapped))
}