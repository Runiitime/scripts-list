import { IState } from 'store/index';

export interface IItem {
  name: string;
  code: string;
  language: string;
  date: string;
}

export interface IScriptItem extends IItem {
  id: string;
}

export interface IDictionary {
  [index: string]: IScriptItem;
}

export interface IScripts {
  scripts: IDictionary;
  selectedId: string;
}

export type GetStateFunc = () => IState;