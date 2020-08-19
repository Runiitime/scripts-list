import scriptsSlice from './slice';
import { IScriptItem, IDictionary, GetStateFunc } from './types';
import { IState } from 'store/index';
import { scriptSelectors } from './selectors';
import { produce } from 'immer';

export const setScriptsData = (script: IScriptItem): Function => (dispatch: Function, getState: GetStateFunc): void => {
  const state: IState = getState();
  const scripts: IDictionary = scriptSelectors(state).scriptList();
  const edited: IDictionary = produce(scripts, (draft: IDictionary): void => {
    draft[script.id] = script;
  });
  dispatch(scriptsSlice.actions.setData(edited));
}