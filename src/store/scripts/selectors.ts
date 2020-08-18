import { createSelector, OutputSelector } from '@reduxjs/toolkit';
import { IScriptItem, IDictionary } from './types';
import { IState } from "store";

interface IScriptsSelector {
  scripts(): IScriptItem[];
  scriptList(): IDictionary;
  selectedId(): string;
  item(): IScriptItem;
};

const getScriptsList = (state: IState): IDictionary => state.scripts.scripts;
const getSelectedItemId = (state: IState): string => state.scripts.selectedId;

const getScripts: OutputSelector<IState, IScriptItem[], (res: IDictionary) => IScriptItem[]> = createSelector(getScriptsList, (scripts: IDictionary): IScriptItem[] => Object.values(scripts));
const getSelectedId: OutputSelector<IState, string, (res: string) => string> = createSelector(getSelectedItemId, (selectedId: string): string => selectedId);
const getItem: OutputSelector<IState, IScriptItem, (res1: IDictionary, res2: string) => IScriptItem> = createSelector([getScriptsList, getSelectedId], (scripts: IDictionary, id: string) => scripts[id]);

export const scriptSelectors = (state: IState, id?: string): IScriptsSelector => ({
  scripts: (): IScriptItem[] => getScripts(state),
  scriptList: (): IDictionary => getScriptsList(state),
  selectedId: (): string => getSelectedId(state),
  item: (): IScriptItem => getItem(state)
});