import { createSelector, OutputSelector } from '@reduxjs/toolkit'
import { IScriptItem } from './slice'
import { IState } from "store"

type List = Map<string, IScriptItem>
interface IScriptsSelector {
  scripts(): List;
  activeId(): string;
}

const getScriptsList = (state: IState): List => state.scripts.scripts
const getActiveItemId = (state: IState): string => state.scripts.activeId

// 1 вариант
export const getScripts: OutputSelector<IState, List, (res: List) => List> = createSelector(getScriptsList, (scripts: List) => scripts)
export const getActiveId: OutputSelector<IState, string, (res: string) => string> = createSelector(getActiveItemId, (activeId: string) => activeId)

// 2 вариант
export const scriptSelectors = (state: IState): IScriptsSelector => ({
  scripts: (): List => getScripts(state),
  activeId: (): string => getActiveId(state)
})