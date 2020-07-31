import React, { KeyboardEvent, useState, useEffect } from "react"
import { IScriptItem, ActiveId, IChangePayload } from 'store/scripts/slice'

interface IOwnProps {
  script: IScriptItem;
  activeId: ActiveId;
}

interface IFuncProps {
  onSetActive: (activeId: ActiveId) => void
  onChange: (payload: IChangePayload) => void
}

type IProps = IOwnProps & IFuncProps

const ScriptItem: React.FC<IProps> = (props: IProps) => {
  const [editId, setEditId] = useState<ActiveId>(null)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('')
  const [date, setDate] = useState('')

  useEffect((): void => {
    setDefaultData()
  }, [])

  const onDoubleClick = (): void => {
    const { script: { id } } = props
    setActive(id)
  }

  const setActive = (id: ActiveId): void => {
    const { onSetActive } = props
    setEditId(id)
    onSetActive(id)
  }

  const setDefaultData = (): void => {
    const { script } = props
    setName(script.name)
    setCode(script.code)
    setLanguage(script.language)
    setDate(script.date)
  }

  const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setName(value);
  }

  const onChangeCodeInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target
    setCode(value);
  }

  const onChangeLanguageInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setLanguage(value);
  }

  const onChangeDateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setDate(value);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { onChange, script } = props

    if (e.keyCode === 13) {
      setActive(null)
      onChange({id: script.id, name, code, language, date})
    }

    if (e.keyCode === 27) {
      setActive(null)
      setDefaultData()
    }
  }

  const renderFields = (): JSX.Element => {
    const { script, activeId } = props
    if (activeId && editId && activeId === editId) {
      return (
        <>
          <div className="table-field__edit">
            <input value={name} onChange={onChangeNameInput} onKeyDown={onKeyDown} autoFocus/>
          </div>
          <div className="table-field__edit">
            <textarea
              value={code}
              onChange={onChangeCodeInput}
              onKeyDown={onKeyDown}
            />
          </div>
          <div className="table-field__edit">
            <input value={language} onChange={onChangeLanguageInput} onKeyDown={onKeyDown}/>  
          </div>
          <div className="table-field__edit">
            <input value={date} onChange={onChangeDateInput} onKeyDown={onKeyDown}/>
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

  const generateEditClass = (): string => {
    const { activeId } = props
    return (editId && activeId) && (editId === activeId) ? 'script-item' : 'script-item item-not-edit'
  }

  const scriptItemClassName = generateEditClass()
  return (
    <div className={scriptItemClassName} onDoubleClick={ onDoubleClick }>
      { renderFields() }
    </div>
  )
}

export default ScriptItem