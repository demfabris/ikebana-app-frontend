import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from 'services/api';

import Dialog from '../../Dialog';

import './styles.scss';

export default function MessageDialog({handler, el}) {
    const authKey = useSelector(state => state.auth.keys)

    const updateNotif = async (key=authKey) => {
        try {
            const response = await api({
                method: 'post',
                url: 'update_notif',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
                data: {
                    notif_id: el.id
                }
            })
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        updateNotif()
    },[])

    return(
        <Dialog handler={handler}>
            <div className="message-dialog-landscape">
                <div className="message-dialog-landscape__header">
                    <h1 className="message-dialog-landscape__header--text">Notificação</h1>
                    <i className="material-icons">inbox</i>
                </div>
                <div className="message-dialog-landscape__content">
                    <h2 className="message-dialog-landscape__content--sender">Mensagem do Sistema</h2>
                    <p className="message-dialog-landscape__content--text">{el.content}</p>
                </div>
                <div className="message-dialog-landscape__footer">
                    <button onClick={handler} className="app-btn msg-btn">Fechar</button>
                </div>
            </div>
        </Dialog>
    );
}
