import scriptsSlice, { ActiveId, IScriptItem } from './slice'
import { IState } from 'store/index'

export const setActiveId = (id: ActiveId): Function => (dispatch: Function): void => {
  dispatch(scriptsSlice.actions.changeActiveScriptId(id))
}

export const editScript = (script: IScriptItem): Function => (dispatch: Function, getState: () => IState): void => {
  const { scripts } = getState().scripts
  let mapped = new Map<string, IScriptItem>()
  Array.from(scripts).forEach(([id, value]): void => {
    let val = value
    if (id === script.id) {
      val = script
    }
    mapped.set(id, val)
  })
  dispatch(scriptsSlice.actions.editScript(mapped))
}