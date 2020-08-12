import { createSelector, OutputSelector } from '@reduxjs/toolkit'
import { IScriptItem } from './slice'
import { IState } from "store"

interface IScriptsSelector {
  scripts(): IScriptItem[];
  activeId(): string;
}

const getScriptsList = (state: IState): IScriptItem[] => Object.values(state.scripts.scripts)
const getActiveItemId = (state: IState): string => state.scripts.activeId

// 1 вариант
export const getScripts: OutputSelector<IState, IScriptItem[], (res: IScriptItem[]) => IScriptItem[]> = createSelector(getScriptsList, (scripts: IScriptItem[]) => scripts)
export const getActiveId: OutputSelector<IState, string, (res: string) => string> = createSelector(getActiveItemId, (activeId: string) => activeId)

// 2 вариант
export const scriptSelectors = (state: IState): IScriptsSelector => ({
  scripts: (): IScriptItem[] => getScripts(state),
  activeId: (): string => getActiveId(state)
})