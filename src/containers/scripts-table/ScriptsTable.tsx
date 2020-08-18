import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'store/index';
import scriptsSlice from 'store/scripts/slice';
import { IScriptItem } from 'store/scripts/types';
import ScriptItem from "components/script-list/ScriptItem";
import { setScriptsData } from 'store/scripts/thunk';
import { scriptSelectors} from 'store/scripts/selectors';


interface IStateProps {
  scripts: IScriptItem[];
  selectedId: string;
  item: IScriptItem;
}

const ScriptsTable: React.FC = () => {
  const { scripts, selectedId, item } = useSelector<IState, IStateProps>((state: IState): IStateProps => ({
    scripts: scriptSelectors(state).scripts(),
    selectedId: scriptSelectors(state).selectedId(),

    // Демонстрация использования createSelector с переданным параметром
    item: scriptSelectors(state).item(),
  }));

  const dispatch = useDispatch();
  const renderHeader = (): JSX.Element => {
    const tableFieldClassName = "table-field"
    return (
      <div className="scripts-table__header">
        <div className={tableFieldClassName}>Название</div>
        <div className={tableFieldClassName}>Код</div>
        <div className={tableFieldClassName}>Язык программирования</div>
        <div className={tableFieldClassName}>Дата изменения</div>
      </div>
    )
  }

  const renderItems = (): JSX.Element[] => {
    return scripts.map((item: IScriptItem): JSX.Element =>  (
      <ScriptItem script={item} key={item.id} selectedId={selectedId} onSetSelectedId={onSetSelectedId} onChange={onChangeItem}/>
    ))
  }

  const onSetSelectedId = (selectedId: string): void => {
    dispatch(scriptsSlice.actions.setSelectedId(selectedId))
  }

  const onChangeItem = (item: IScriptItem): void => {
    dispatch(setScriptsData(item))
  }

  return (
    <div className="scripts-table">
      { renderHeader() }
      { renderItems() }
    </div>
  )
}

export default ScriptsTable;