import React from "react"
import classNames from "classnames"

interface IOwnProps {
  children: JSX.Element;
  isOpen: boolean;
}

interface IFuncProps {
  onSave?: () => void;
  onClose?: (isOpen: boolean) => void;
}

type IProps = IOwnProps & IFuncProps

const Modal: React.FC<IProps> = (props: IProps) => {

  const onCloseModal = (): void => {
    props.onClose(false)
  }

  const onSaveModal = (): void => {
    props.onSave()
  }

  const overlayClassName = classNames({
    'overlay': true,
    'overlay-hidden': !props.isOpen
  })
  
  return (
    <div className={overlayClassName}>
      <div className="modal">
        <div className="modal-content">
          { props.children }
        </div>
        <div className="modal-footer">
          <button onClick={onSaveModal} className="btn btn-save">Save</button>
          <button onClick={onCloseModal} className="btn btn-close">Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal