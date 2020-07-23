import React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IState } from '../../store'
import { IScriptItem, IAddPayload, IChangePayload, addScript, editScript, TActiveId, changeActiveScriptId } from '../../store/scripts/slice'
import ScriptItem from "../../components/script-list/ScriptItem"

interface IStateProps {
  scripts: IScriptItem[];
  activeId: TActiveId;
}

interface IFunProps {
  addScript: (payload: IAddPayload) => {};
  editScript: (payload: IChangePayload) => {};
  changeActiveScriptId: (payload: TActiveId) => {}
}

class ScriptsTable extends React.Component<IStateProps & IFunProps> {

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

  private renderItems = (): JSX.Element[] => {
    const { scripts, activeId } = this.props
    return scripts.map((item: IScriptItem) => (
      <ScriptItem script={item} key={item.id} activeId={activeId} onSetActive={this.handleSetActiveId} onChange={this.handleChangeItem}/>
    ))
  }

  private handleSetActiveId = (activeId: TActiveId): void => {
    const { changeActiveScriptId } = this.props
    changeActiveScriptId(activeId)
  }

  private handleChangeItem = (item: IChangePayload): void => {
    const { editScript } = this.props
    editScript(item)
  }
  

  public render() {
    const { scripts, activeId } = this.props
    return (
      <div className="scripts-table">
        { this.renderHeader() }
        { this.renderItems() }
      </div>
    )
  }
}

const mapStateToProps = (state: IState): IStateProps => {
  return {
    scripts: state.scripts.scripts,
    activeId: state.scripts.activeId
  }
}

const mapDispatchToProps = (dispatch: any): IFunProps => bindActionCreators({
  addScript,
  editScript,
  changeActiveScriptId,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ScriptsTable)