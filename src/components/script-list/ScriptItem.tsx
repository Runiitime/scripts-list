import React, { ChangeEvent, KeyboardEvent } from "react"
import { IScriptItem, ActiveId, IChangePayload } from 'store/scripts/slice'

interface IOwnState {
  editId: ActiveId;
  name: string;
  code: string;
  language: string;
  date: string;
}

interface IOwnProps {
  script: IScriptItem;
  activeId: ActiveId;
}

interface IFuncProps {
  onSetActive: (activeId: ActiveId) => void
  onChange: (payload: IChangePayload) => void
}

type IProps = IOwnProps & IFuncProps

class ScriptItem extends React.Component<IProps, IOwnState> {
  constructor(props: IProps) {
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

  private onDoubleClick = (): void => {
    const { script: { id } } = this.props
    this.setActive(id)
  }

  private setActive = (id: ActiveId): void => {
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

  private onKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { onChange, script } = this.props
    const { name, code, language, date } = this.state

    if (e.keyCode === 13) {
      this.setActive(null)
      onChange({id: script.id, name, code, language, date})
    }

    if (e.keyCode === 27) {
      this.setActive(null)
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
            <input value={name} onChange={this.onChangeNameInput} onKeyDown={this.onKeyDown} autoFocus/>
          </div>
          <div className="table-field__edit">
            <textarea
              value={code}
              onChange={this.onChangeCodeInput}
              onKeyDown={this.onKeyDown}
            />
          </div>
          <div className="table-field__edit">
            <input value={language} onChange={this.onChangeLanguageInput} onKeyDown={this.onKeyDown}/>  
          </div>
          <div className="table-field__edit">
            <input value={date} onChange={this.onChangeDateInput} onKeyDown={this.onKeyDown}/>
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

  private generateEditClass = (): string => {
    const { editId } = this.state
    const { activeId } = this.props

    return (editId && activeId) && (editId === activeId) ? 'script-item' : 'script-item item-not-edit'
  }
  
  public render() {
    const scriptItemClassName = this.generateEditClass()
    return (
      <div className={scriptItemClassName} onDoubleClick={ this.onDoubleClick }>
        { this.renderFields() }
      </div>
    )
  }
}

export default ScriptItem