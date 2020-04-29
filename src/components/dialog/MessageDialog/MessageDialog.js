import React from 'react';

import './styles.scss';

export default function MessageDialog({handler, el}) {
    console.log(el)

    //REMAKE MESSAGE COMPONENT!

    return(
        <div className="msg-dialog">
            <div className="msg-dialog__content">
                <div className="msg-dialog__content--header">
                    <h2>Notificação</h2>
                    <i className="material-icons">inbox</i>
                </div>
                <div className="msg-dialog__content--text">
                    <p>{el.content}</p>
                </div>
                <div className="msg-dialog__content--footer">
                    <button onClick={handler}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
