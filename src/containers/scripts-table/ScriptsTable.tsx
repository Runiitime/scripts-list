import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { IState } from 'store/index'
import { IChangePayload, IScriptItem } from 'store/scripts/slice'
import ScriptItem from "components/script-list/ScriptItem"
import { setActiveId, editScript } from 'store/scripts/thunk'
// 1 вариант
// import { getActiveId, getScripts} from 'store/scripts/selectors'
// 2 вариант
import { scriptSelectors} from 'store/scripts/selectors'


interface IStateProps {
  scripts: IScriptItem[];
  activeId: string;
  item: IScriptItem;
}

const ScriptsTable: React.FC = () => {
  const { scripts, activeId, item } = useSelector<IState, IStateProps>((state: IState): IStateProps => ({
    // 1 вариант
    // scripts: getScripts(state),
    // activeId: getActiveId(state)

    // 2 вариант
    scripts: scriptSelectors(state).scripts(),
    activeId: scriptSelectors(state).activeId(),

    // Демонстрация использования createSelector с переданным параметром
    item: scriptSelectors(state, "5bba2500-fdbf-4375-a9c3-f7f7864b7df0A").item,
  }))

  const dispatch = useDispatch()
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
      <ScriptItem script={item} key={item.id} activeId={activeId} onSetActive={onSeActiveId} onChange={onChangeItem}/>
    ))
  }

  const onSeActiveId = (activeId: string): void => {
    dispatch(setActiveId(activeId))
  }

  const onChangeItem = (item: IChangePayload): void => {
    dispatch(editScript(item))
  }

  return (
    <div className="scripts-table">
      { renderHeader() }
      { renderItems() }
    </div>
  )
}

export default ScriptsTable