import React from "react"
import { connect } from 'react-redux'
import { IState } from 'store/index'
import scriptsSlice, { ActiveId, IAddPayload, IChangePayload, IScriptItem } from 'store/scripts/slice'
import ScriptItem from "components/script-list/ScriptItem"
import { setActiveId, editScript } from 'store/scripts/thunk'

interface IStateProps {
  scripts: Map<string, IScriptItem>;
  activeId: ActiveId;
}

interface IDispatchProps {
  onAddScript: (payload: IAddPayload) => void;
  onEditScript: (payload: IChangePayload) => void;
  onChangeActiveScriptId: (payload: ActiveId) => void;
}

type IProps = IStateProps & IDispatchProps

class ScriptsTable extends React.Component<IProps> {

  private renderHeader = (): JSX.Element => {
    return (
      <div className="scripts-table__header">
        <div className="table-field">Название</div>
        <div className="table-field">Код</div>
        <div className="table-field">Язык программирования</div>
        <div className="table-field">Дата изменения</div>
      </div>
    )
  }

  private renderItems = () => {
    const { scripts, activeId } = this.props
    let items: JSX.Element[] = []
    scripts.forEach((item: IScriptItem): void => {
      items.push(<ScriptItem script={item} key={item.id} activeId={activeId} onSetActive={this.onSeActiveId} onChange={this.onChangeItem}/>)
    })

    return items
  }

  private onSeActiveId = (activeId: ActiveId): void => {
    const { onChangeActiveScriptId } = this.props
    onChangeActiveScriptId(activeId)
  }

  private onChangeItem = (item: IChangePayload): void => {
    const { onEditScript } = this.props
    onEditScript(item)
  }
  
  public render() {
    return (
      <div className="scripts-table">
        { this.renderHeader() }
        { this.renderItems() }
      </div>
    )
  }
}

const mapStateToProps = (state: IState): IStateProps => ({
  scripts: state.scripts.scripts,
  activeId: state.scripts.activeId
})

export const mapDispatchToProps: IDispatchProps = {
  onAddScript: scriptsSlice.actions.addScript,
  onEditScript: editScript,
  onChangeActiveScriptId: setActiveId,
}

export default connect(mapStateToProps, mapDispatchToProps)(ScriptsTable)