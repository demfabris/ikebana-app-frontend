import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function EmptyMessages() {
    return(
        <>
            <div className="new-main">
                <div className="new-main__content">
                    <i className="material-icons">mail</i>
                    <h3 className="new-title">Nenhuma Notificação</h3>
                    <p className="new-desc">Caixa de mensagens limpa...</p>
                </div>
            </div>
        </>
    );
}
