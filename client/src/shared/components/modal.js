import React from 'react';
import classNames from 'classnames';
import styles from './modal.css';

const Modal = ({isOpened, children, buttons, title}) => {

    return (<div className={classNames('modal-holder', {'is-opened': isOpened})}>
        <div className={'modal'}>
            <div className={'title'}>
                <p>{title}</p>
            </div>
            <div className={'modal-body'}>
                {children}
            </div>
            <div className={'footer'}>
                {buttons.map(button => ({...button}))}
            </div>
        </div>
    </div> )
}

export default Modal;
