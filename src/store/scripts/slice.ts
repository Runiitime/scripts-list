import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDictionary, IItem, IScripts} from './types';

const initialState: IScripts = {
  scripts: {
    "5bba2500-fdbf-4375-a9c3-f7f7864b7df0A": {
      id: "5bba2500-fdbf-4375-a9c3-f7f7864b7df0A",
      name: "Python function example",
      code: `
      def my_function():
        print("Python function example")`,
      language: "Python",
      date: "5 июля 2020"
    }, 
    "30755e0a-2426-450f-80dd-c6a850536df9": {
      id: "30755e0a-2426-450f-80dd-c6a850536df9",
      name: "JS function example",
      code: `const fn = () => {
        console.log('JS function example"')
      }`,
      language: "Javascript",
      date: "20 июля 2020"
    }, 
    "e344888a-d869-42d1-b88b-5a8827677e31": {
      id: "e344888a-d869-42d1-b88b-5a8827677e31",
      name: "Java function example",
      code: `public void fn() {
        System.out.println('Java function example')
      }`,
      language: "Java",
      date: "22 июля 2020"
    }, 
  },
  selectedId: null
};

const { actions, reducer } = createSlice({
  name: "scripts",
  initialState,
  reducers: {
    setData: (state: IScripts, { payload }: PayloadAction<IDictionary>): void => {
      state.scripts = payload
    },
    addScript: (state: IScripts, { payload }: PayloadAction<IItem>): void => {},
    deleteScript: (state: IScripts, { payload }: PayloadAction<string>): void => {},
    setSelectedId: (state: IScripts, { payload }: PayloadAction<string>): void => {
      state.selectedId = payload
    }
  }
});

export default { actions, reducer };
