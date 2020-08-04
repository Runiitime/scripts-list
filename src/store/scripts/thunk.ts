import scriptsSlice, { IScriptItem } from './slice'
import { IState } from 'store/index'
import { scriptSelectors } from './selectors'

export const setActiveId = (id: string): Function => (dispatch: Function): void => {
  dispatch(scriptsSlice.actions.changeActiveScriptId(id))
}

export const editScript = (script: IScriptItem): Function => (dispatch: Function, getState: () => IState): void => {
  const scripts = scriptSelectors(getState()).scripts()
  let mapped = new Map<string, IScriptItem>()
  Array.from(scripts).forEach(([id, value]): void => {
    let val = id === script.id ? script : value
    mapped.set(id, val)
  })
  dispatch(scriptsSlice.actions.editScript(mapped))
}