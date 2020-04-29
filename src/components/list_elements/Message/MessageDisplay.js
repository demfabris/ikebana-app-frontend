import React, { useState, useEffect } from 'react';
import { setNotifRead } from 'store/ducks/notifications';
import { useDispatch } from 'react-redux';

import MessageDialog from '../../Dialog/components/MessageDialog/MessageDialog';
import Modal from '../../aux/Modal.js';

import './styles.scss';

export default function MessageDisplay(el) {
    const [dialog, setDialog] = useState(false);
    const dispatch = useDispatch();

    const joinDate = Date.parse(el.sended_on)
    const created = new Date(joinDate)

    return(
        <>
            <div onClick={() => {
                setDialog(true);
                }} className="msg-element">
                <ul className="msg-element__list">
                    <li className="msg-element__list--el">
                        <i className="material-icons">
                    {`${el.is_read ? 'drafts' : 'mail'}`}</i>
                    </li>
                    <li className="msg-element__list--el">
                        <p className="msg-preview">{el.content}</p>
                    </li>
                    <li className="msg-element__list--el">
                        <p className="msg-sender">Mensagem do sistema</p>
                    </li>
                    <li className="msg-element__list--el">
                        <p className="msg-date">
                            {' ' + created.getDate()
                            }/{1 + created.getMonth()
                            }/{created.getFullYear()}
                        </p>
                    </li>
                </ul>
            </div>
            {
                dialog &&
                    <Modal>
                        <MessageDialog handler={() => {
                            setDialog(false)
                            dispatch(setNotifRead(el.id))
                        }} el={el}/>
                    </Modal>
            }
        </>
    );
}
