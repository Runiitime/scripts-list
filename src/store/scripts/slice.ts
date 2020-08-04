import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IScriptItem {
  id: string;
  name: string;
  code: string;
  language: string;
  date: string;
}

export interface IScripts {
  scripts: Map<string, IScriptItem>;
  activeId: string;
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
  scripts: new Map([
    [
      "5bba2500-fdbf-4375-a9c3-f7f7864b7df0", 
      {
        id: "5bba2500-fdbf-4375-a9c3-f7f7864b7df0",
        name: "Example",
        code: "Example code",
        language: "PHP",
        date: "5 июля 2020"
      }, 
    ],
    [
      "30755e0a-2426-450f-80dd-c6a850536df9", 
      {
        id: "30755e0a-2426-450f-80dd-c6a850536df9",
        name: "什么是Lorem Ipsum?",
        code: "也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野",
        language: "JS",
        date: "20 июля 2020"
      }, 
    ],
    [
      "e344888a-d869-42d1-b88b-5a8827677e31", 
      {
        id: "e344888a-d869-42d1-b88b-5a8827677e31",
        name: "Example 3",
        code: "Example code 3",
        language: "C++",
        date: "22 июля 2020"
      }, 
    ],
  ]),
  activeId: null
}

const { actions, reducer } = createSlice({
  name: "scripts",
  initialState,
  reducers: {
    editScript: (state: IScripts, { payload }: PayloadAction<Map<string, IScriptItem>>): void => {
      state.scripts = payload
    },
    addScript: (state: IScripts, { payload }: PayloadAction<IAddPayload>): void => {},
    changeActiveScriptId: (state: IScripts, { payload }: PayloadAction<string>): void => {
      state.activeId = payload
      
    }
  }
})

export default { actions, reducer }
