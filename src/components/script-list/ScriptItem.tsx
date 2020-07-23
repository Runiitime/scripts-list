import React, { ChangeEvent, KeyboardEvent } from "react"
import { IScriptItem, TActiveId, IChangePayload } from '../../store/scripts/slice'

interface IState {
  editId: TActiveId;
  name: string;
  code: string;
  language: string;
  date: string;
}

interface IStateProps {
  script: IScriptItem;
  activeId: TActiveId;
}

interface IFuncProps {
  onSetActive: (activeId: TActiveId) => void
  onChange: (payload: IChangePayload) => void
}

class ScriptItem extends React.Component<IStateProps & IFuncProps, IState> {
  constructor(props: IStateProps & IFuncProps) {
    super(props)
    const { script: { name, code, language, date } } = props
    this.state = {
      editId: "",
      name: name,
      code: code,
      date: date,
      language: language
    }
  }

  private onSetChange = (): void => {
    const { script: { id } } = this.props
    this.handleSetActive(id)
  }

  private handleSetActive = (id: TActiveId): void => {
    const { onSetActive } = this.props
    this.setState({
      editId: id
    })
    onSetActive(id)
  }

  private onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    this.setState({name: value});
  }

  private onChangeCodeInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target
    this.setState({code: value});
  }

  private onChangeLanguageInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    this.setState({language: value});
  }

  private onChangeDateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    this.setState({date: value});
  }

  private handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { onChange, script } = this.props
    const { name, code, language, date } = this.state

    if (e.keyCode === 13) {
      this.handleSetActive(null)
      onChange({id: script.id, name, code, language, date})
    }

    if (e.keyCode === 27) {
      this.handleSetActive(null)
      this.setState({
        name: script.name,
        code: script.code,
        language: script.language,
        date: script.date,
      })
    }
  }

  private renderFields = (): JSX.Element => {
    const { script, activeId } = this.props
    const { editId, name, code, language, date } = this.state
    if (activeId && editId && activeId === editId) {
      return (
        <>
          <div className="table-field__edit">
            <input value={name} onChange={this.onChangeNameInput} onKeyDown={this.handleKeyDown} autoFocus/>
          </div>
          <div className="table-field__edit">
            <textarea
              value={code}
              onChange={this.onChangeCodeInput}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="table-field__edit">
            <input value={language} onChange={this.onChangeLanguageInput} onKeyDown={this.handleKeyDown}/>  
          </div>
          <div className="table-field__edit">
            <input value={date} onChange={this.onChangeDateInput} onKeyDown={this.handleKeyDown}/>
          </div>
        </>
      )
    }

    return (
      <>
        <div className="table-field">{ script.name }</div>
        <div className="table-field">{ script.code.length > 100 ? `${script.code.slice(0, 100)}...` : script.code }</div>
        <div className="table-field">{ script.language }</div>
        <div className="table-field">{ script.date }</div>
      </>
    )
  }
  
  public render() {
    const { editId } = this.state
    const { activeId } = this.props
    const scriptItemClassName = editId === activeId ? 'script-item' : 'script-item item-not-edit'
    return (
      <div className={scriptItemClassName} onDoubleClick={ this.onSetChange }>
        { this.renderFields() }
      </div>
    )
  }
}

export default ScriptItem