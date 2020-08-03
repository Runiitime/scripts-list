import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { IState } from 'store/index'
import { ActiveId, IChangePayload, IScriptItem } from 'store/scripts/slice'
import ScriptItem from "components/script-list/ScriptItem"
import { setActiveId, editScript } from 'store/scripts/thunk'
// 1 вариант
// import { getActiveId, getScripts} from 'store/scripts/selectors'
// 2 вариант
import { scriptSelectors} from 'store/scripts/selectors'

interface IStateProps {
  scripts: Map<string, IScriptItem>;
  activeId: ActiveId;
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
    return (
      <div className="scripts-table__header">
        <div className="table-field">Название</div>
        <div className="table-field">Код</div>
        <div className="table-field">Язык программирования</div>
        <div className="table-field">Дата изменения</div>
      </div>
    )
  }

  const renderItems = () => {
    let items: JSX.Element[] = []
    scripts.forEach((item: IScriptItem): void => {
      items.push(<ScriptItem script={item} key={item.id} activeId={activeId} onSetActive={onSeActiveId} onChange={onChangeItem}/>)
    })

    return items
  }

  const onSeActiveId = (activeId: ActiveId): void => {
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