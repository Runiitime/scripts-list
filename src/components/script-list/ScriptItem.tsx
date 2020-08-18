import React, { KeyboardEvent, useState, useEffect } from "react";
import { IScriptItem } from 'store/scripts/types';
import classNames from "classnames";
import Modal from 'components/modal/Modal';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

interface IOwnProps {
  script: IScriptItem;
  selectedId: string;
}

interface IFuncProps {
  onSetSelectedId: (selectedId: string) => void
  onChange: (payload: IScriptItem) => void
}

type IProps = IOwnProps & IFuncProps;

enum Codes {
  Esc = 23,
  Enter = 13
};

const ScriptItem: React.FC<IProps> = (props: IProps) => {
  const [editId, setEditId] = useState<string>(null);
  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [editField, setEditField] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect((): void => {
    setDefaultData()
  }, []);

  const codesFuncs = {
    [`${Codes.Esc}`]: () => setDefaultData(),
    [`${Codes.Enter}`]: () => {
      const { onChange, script } = props;
      onChange({id: script.id, name, code, language, date});
    },
  }

    // Я пробовала указать тип React.MouseEvent<HTMLDivElement> вместо any но тогда я никак не могу получить свойство id 
  const onDoubleClick = (e: any): void => {
    const { script: { id } } = props;
    setActive(id, e.target.id);
  }

  const setActive = (id: string, field?: string): void => {
    const { onSetSelectedId } = props;
    setEditId(id);
    setEditField(field);
    onSetSelectedId(id);
  }

  const setDefaultData = (): void => {
    const { script } = props;
    setName(script.name);
    setCode(script.code);
    setLanguage(script.language);
    setDate(script.date);
  }

  const onChangeNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setName(value);
  }

  const onChangeCodeInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setCode(value);
  }

  const onChangeLanguageInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setLanguage(value);
  }

  const onChangeDateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setDate(value);
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { onChange, script } = props;
    
    if (![Codes.Enter, Codes.Esc].includes(e.keyCode)) return;
   
    setActive(null);
    const codeFunction = codesFuncs[e.keyCode];
    codeFunction();
    // if (e.keyCode === Codes.Enter) {
      
    //   onChange({id: script.id, name, code, language, date});
    // }

    // if (e.keyCode === Codes.Esc) {
    //   setActive(null);
    //   setDefaultData();
    // }
  }

  // Я пробовала указать тип React.MouseEvent<HTMLImageElement> вместо any но тогда я никак не могу получить свойство id
  const onEditClick = (e: any): void => {
    const { script: { id } } = props;
    const elemID: string = e.target.id;
    const ids = elemID.split('_');
    if (ids.length > 0) {
      setDefaultData();
      setActive(id, ids[0]);
      setIsOpen(true);
    }
  }

  const getEditMode = (): boolean => {
    const { selectedId } = props;
    return selectedId && editId && selectedId === editId && !isOpen;
  }

  const getRenderField = (inputField: JSX.Element, value: string, fieldName: string, id: string): JSX.Element => {
    const isEditMode = getEditMode();
    return (
      <>
        {
          editField === fieldName && isEditMode ? inputField : (
            <>
              <img src="https://img.icons8.com/android/24/000000/edit.png" onClick={onEditClick} id={`${fieldName}__${id}`} className="edit" alt="edit"/>
              {value}
            </>
          )
        }
      </>
    )
  }

  const renderFields = (): JSX.Element => {
    const { script } = props;
    const isEditMode = getEditMode();
    const editClassName = isEditMode ? 'table-field__edit' : 'table-field';
    const codeValue = script.code.length > 100 ? `${script.code.slice(0, 100)}...` : script.code;
    return (
      <>
        <div className={editClassName} id="name">
          { getRenderField(<input value={name} onChange={onChangeNameInput} onKeyDown={onKeyDown} autoFocus/>, script.name, 'name', script.id) }
        </div>
        <div className={editClassName} id="code">
          { getRenderField(<textarea value={code} onChange={onChangeCodeInput} onKeyDown={onKeyDown} autoFocus/>, codeValue, 'code', script.id) }
        </div>
        <div className={editClassName} id="language">
          { getRenderField(<input value={language} onChange={onChangeLanguageInput} onKeyDown={onKeyDown} autoFocus/>, script.language, 'language', script.id) }
        </div>
        <div className={editClassName} id="date">
          { getRenderField(<input value={date} onChange={onChangeDateInput} onKeyDown={onKeyDown} autoFocus/>, script.date, 'date', script.id)}
        </div>
      </>
    )
  }

  const generateEditClass = (): string => {
    const { selectedId } = props;
    return classNames({
      'script-item': true,
      'item-not-edit': (!editId && !selectedId) || (editId !== selectedId)
    });
  }

  const onCloseModal = (value: boolean): void => {
    const { script: { id } } = props;

    setIsOpen(value);
    setDefaultData();
    setActive(null);
  }

  const onSaveModal = (): void => {
    const { script, onChange } = props;
    onChange({id: script.id, name, code, language, date});
    setActive(null);
    setIsOpen(false);
  }

  const onAceChange = (value: string): void => {
    setCode(value);
  }

  const renderModalFields = (): JSX.Element => {
    const inputClassName = 'modal-input';
    if (editField === 'name') {
      return <input value={name} onChange={onChangeNameInput} className={inputClassName}/>
    }

    if (editField === 'language') {
      return <input value={language} onChange={onChangeLanguageInput} className={inputClassName}/>
    }

    if (editField === 'date') {
      return <input value={date} onChange={onChangeDateInput} className={inputClassName}/>
    }

    return <AceEditor
      mode={language.toLowerCase()}
      theme="monokai"
      onChange={onAceChange}
      value={code}
      name={name}
      className="ace-editor"
      editorProps={{ $blockScrolling: true }}
    />
  }
  
  const renderModal = (): JSX.Element => {
    return (
      <Modal isOpen={isOpen} onSave={onSaveModal} onClose={onCloseModal}>
        { renderModalFields() }
      </Modal>
    )
  }

  const scriptItemClassName = generateEditClass();
  return (
    <>
      <div className={scriptItemClassName} onDoubleClick={ onDoubleClick }>
        { renderFields() }
      </div>
      { renderModal() }
    </>
  )
}

export default ScriptItem;