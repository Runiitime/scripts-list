import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';

export type TActiveId = string | null

export interface IScriptItem {
  id: string;
  name: string;
  code: string;
  language: string;
  date: string;
}

export interface IScripts {
  scripts: IScriptItem[];
  activeId: TActiveId;
}

export interface IChangePayload {
  id: string;
  name: string;
  code: string;
  language: string;
  date: string;
}

export interface IAddPayload {
  name: string;
  code: string;
  language: string;
  date: string;
}

const initialState: IScripts = {
  scripts: [
    {
      id: uuidv4(),
      name: "Example",
      code: "Example code",
      language: "PHP",
      date: "5 июля 2020"
    },
    {
      id: uuidv4(),
      name: "什么是Lorem Ipsum?",
      code: "也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野",
      language: "JS",
      date: "20 июля 2020"
    },
    {
      id: uuidv4(),
      name: "Example 3",
      code: "Example code 3",
      language: "C++",
      date: "22 июля 2020"
    },
  ],
  activeId: null
}

const ScriptsSlice = createSlice({
  name: "scripts",
  initialState,
  reducers: {
    editScript: (state: IScripts, { payload }: PayloadAction<IChangePayload>): void => {
      state.scripts = state.scripts.map((item: IScriptItem) => {
        if (item.id === payload.id) {
          item.name = payload.name
          item.code = payload.code
          item.language = payload.language
          item.date = payload.date
        }
        return item
      })
    },
    addScript: (state: IScripts, { payload }: PayloadAction<IAddPayload>): void => {},
    changeActiveScriptId: (state: IScripts, { payload }: PayloadAction<TActiveId>): void => {
      state.activeId = payload
    }
  }
})

export const { editScript, addScript, changeActiveScriptId } = ScriptsSlice.actions
export default ScriptsSlice.reducer
