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
  scripts: Map<string, IScriptItem>;
  activeId: string;
}

const ScriptsTable: React.FC = () => {
  const { scripts, activeId } = useSelector<IState, IStateProps>((state: IState): IStateProps => ({
    // 1 вариант
    // scripts: getScripts(state),
    // activeId: getActiveId(state)

    // 2 вариант
    scripts: scriptSelectors(state).scripts(),
    activeId: scriptSelectors(state).activeId()
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
    return Array.from(scripts).map((item: [string, IScriptItem]): JSX.Element => {
      const current = item[1]
      return (
        <ScriptItem script={current} key={current.id} activeId={activeId} onSetActive={onSeActiveId} onChange={onChangeItem}/>
      )
    })
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