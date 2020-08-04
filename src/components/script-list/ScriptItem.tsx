import React, { KeyboardEvent, useState, useEffect } from "react"
import { IScriptItem, IChangePayload } from 'store/scripts/slice'
import classNames from "classnames"

interface IOwnProps {
  script: IScriptItem;
  activeId: string;
}

interface IFuncProps {
  onSetActive: (activeId: string) => void
  onChange: (payload: IChangePayload) => void
}

type IProps = IOwnProps & IFuncProps

const EscCode = 27
const EnterCode = 13

const ScriptItem: React.FC<IProps> = (props: IProps) => {
  const [editId, setEditId] = useState<string>(null)
  const [name, setName] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [language, setLanguage] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [editField, setEditField] = useState<string>('')

  useEffect((): void => {
    setDefaultData()
  }, [])

  const onDoubleClick = (e: any): void => {
    const { script: { id } } = props
    setActive(id, e.target.id)
  }

  const setActive = (id: string, field?: string): void => {
    const { onSetActive } = props
    setEditId(id)
    setEditField(field)
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

    if (e.keyCode === EnterCode) {
      setActive(null)
      onChange({id: script.id, name, code, language, date})
    }

    if (e.keyCode === EscCode) {
      setActive(null)
      setDefaultData()
    }
  }

  const getRenderField = (inputField: JSX.Element, value: string, fieldName: string): JSX.Element => {
    const { activeId } = props
    const isEditMode = activeId && editId && activeId === editId
    return (
      <>
        {
          editField === fieldName && isEditMode ? inputField : value
        }
      </>
    )
  }

  const renderFields = (): JSX.Element => {
    const { script, activeId } = props
    const isEditMode = activeId && editId && activeId === editId
    const editClassName = isEditMode ? 'table-field__edit' : 'table-field'
    const codeValue = script.code.length > 100 ? `${script.code.slice(0, 100)}...` : script.code
    return (
      <>
        <div className={editClassName} id="name">
          { getRenderField(<input value={name} onChange={onChangeNameInput} onKeyDown={onKeyDown} autoFocus/>, script.name, 'name') }
        </div>
        <div className={editClassName} id="code">
          { getRenderField(<textarea value={code} onChange={onChangeCodeInput} onKeyDown={onKeyDown}/>, codeValue, 'code') }
        </div>
        <div className={editClassName} id="language">
          { getRenderField(<input value={language} onChange={onChangeLanguageInput} onKeyDown={onKeyDown} />, script.language, 'language') }
        </div>
        <div className={editClassName} id="date">
          { getRenderField(<input value={date} onChange={onChangeDateInput} onKeyDown={onKeyDown} />, script.date, 'date')}
        </div>
      </>
    )
  }

  const generateEditClass = (): string => {
    const { activeId } = props
    return classNames({
      'script-item': true,
      'item-not-edit': (!editId && !activeId) || (editId !== activeId)
    })
  }

  const scriptItemClassName = generateEditClass()
  return (
    <div className={scriptItemClassName} onDoubleClick={ onDoubleClick }>
      { renderFields() }
    </div>
  )
}

export default ScriptItem