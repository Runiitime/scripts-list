import { createSelector, OutputSelector } from '@reduxjs/toolkit'
import { IScriptItem, ActiveId } from './slice'
import { IState } from "store"

type List = Map<string, IScriptItem>

const getScriptsList = (state: IState): List => state.scripts.scripts
const getActiveItemId = (state: IState): ActiveId => state.scripts.activeId

export const getScripts: OutputSelector<IState, List, (res: List) => List> = createSelector(getScriptsList, (scripts: List) => scripts)
export const getActiveId: OutputSelector<IState, ActiveId, (res: ActiveId) => ActiveId> = createSelector(getActiveItemId, (activeId: ActiveId) => activeId)