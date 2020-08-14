import scriptsSlice, { IScriptItem, IDictionary } from './slice';
import { IState } from 'store/index';
import { getScriptsList } from './selectors';
import { produce } from 'immer';

type GetStateFunc = () => IState;

export const setActiveId = (id: string): Function => (dispatch: Function): void => {
  dispatch(scriptsSlice.actions.changeActiveScriptId(id));
}

export const editScript = (script: IScriptItem): Function => (dispatch: Function, getState: GetStateFunc): void => {
  const state: IState = getState();
  const scripts: IDictionary = getScriptsList(state);
  const edited: IDictionary = produce(scripts, (draft: IDictionary): void => {
    draft[script.id] = script
  });
  dispatch(scriptsSlice.actions.editScript(edited));
}