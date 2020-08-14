import { createSelector, OutputSelector } from '@reduxjs/toolkit'
import { IScriptItem, IDictionary } from './slice'
import { IState } from "store"

interface IScriptsSelector {
  scripts(): IScriptItem[];
  activeId(): string;
  item: IScriptItem;
};

export const getScriptsList = (state: IState): IDictionary => state.scripts.scripts;
const getActiveItemId = (state: IState): string => state.scripts.activeId;

// 1 вариант
export const getScripts: OutputSelector<IState, IScriptItem[], (res: IDictionary) => IScriptItem[]> = createSelector(getScriptsList, (scripts: IDictionary): IScriptItem[] => Object.values(scripts));
export const getActiveId: OutputSelector<IState, string, (res: string) => string> = createSelector(getActiveItemId, (activeId: string): string => activeId);
export const getItemFactory: (id: string) => OutputSelector<IState, IScriptItem, (res: IDictionary) => IScriptItem> = (id: string) => {
  return createSelector(
    getScriptsList,
    (items: IDictionary): IScriptItem => items[id]
  )
}

// 2 вариант
export const scriptSelectors = (state: IState, id?: string): IScriptsSelector => ({
  scripts: (): IScriptItem[] => getScripts(state),
  activeId: (): string => getActiveId(state),
  item: getItemFactory(id)(state)
});