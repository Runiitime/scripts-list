import React, { KeyboardEvent, useState, useEffect } from "react"
import { IScriptItem, IChangePayload } from 'store/scripts/slice'
import classNames from "classnames"
import Modal from 'components/modal/Modal'
import edit from 'assets/icons/edit.svg'

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

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
  const [isOpen, setIsOpen] = useState<boolean>(false)

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

  const onEditClick = (): void => {
    const { script: { id }, onSetActive } = props
    onSetActive(id)
    setEditId(id)
    setIsOpen(true)
    setDefaultData()
  }

  const getRenderField = (inputField: JSX.Element, value: string, fieldName: string): JSX.Element => {
    const { activeId } = props
    const isEditMode = activeId && editId && activeId === editId
    return (
      <>
        {
          editField === fieldName && isEditMode ? inputField : (
            <>
              <span className="edit" onClick={onEditClick}>
                <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                  <g id="Index" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Group-7" transform="translate(-326.000000, -244.000000)" fill="#3AB487" fill-rule="nonzero">
                          <g id="np_edit_1751206_000000" transform="translate(326.000000, 244.000000)">
                              <path d="M5.35500335,14.8776665 L5.8193621,14.4133077 L1.58681797,10.1807636 L11.1104912,0.657090356 C11.9866117,-0.219030119 13.4084915,-0.219030119 14.28463,0.657090356 L15.3431251,1.71558554 C16.2192456,2.59170601 16.2192456,4.01358585 15.3431251,4.88972428 L5.35500335,14.8776665 Z M4.75596457,15.4661823 C4.35192451,15.8099036 3.83705176,16 3.3025337,16 L0.373871739,16 C0.166949354,16 0,15.8330524 0,15.6261283 L0,12.6974663 C0,12.1629482 0.190096361,11.6480755 0.533817732,11.2440354 L4.75596457,15.4661823 Z" id="Shape"></path>
                          </g>
                      </g>
                  </g>
                </svg>
              </span>
              {value}
            </>
          )
        }
      </>
    )
  }

  const renderFields = (): JSX.Element => {
    const { script, activeId } = props
    const isEditMode = activeId && editId && activeId === editId && !isOpen
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

  const onCloseModal = (value: boolean): void => {
    setIsOpen(value)
    setDefaultData()
  }

  const onSaveModal = (): void => {
    const { script, onChange } = props
    onChange({id: script.id, name, code, language, date})
    setActive(null)
    setIsOpen(false)
  }

  const aceChange = (value: string): void => {
    setCode(value);
  }

  const renderModalFields = (): JSX.Element => {
    return <AceEditor
      mode={language.toLowerCase()}
      theme="monokai"
      onChange={aceChange}
      value={code}
      name={name}
      className="ace-editor"
      editorProps={{ $blockScrolling: true }}
    />
  }
  
  const renderModal = (): JSX.Element => {
    return (
      <Modal isOpen={isOpen} onSave={onSaveModal} onClose={onCloseModal}>
        <div>{ renderModalFields() }</div>
      </Modal>
    )
  }

  const scriptItemClassName = generateEditClass()
  return (
    <>
      <div className={scriptItemClassName} onDoubleClick={ onDoubleClick }>
        { renderFields() }
      </div>
      { renderModal() }
    </>
  )
}

export default ScriptItem