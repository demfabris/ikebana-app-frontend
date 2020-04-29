import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function EmptyDisplay() {
    return(
        <>
            <div className="new-main">
                <div className="new-main__content">
                    <i className="material-icons">create</i>
                    <h3 className="new-title">Nenhum Projeto</h3>
                    <Link to="/account/new_project">
                        <button className="new-btn">
                            Começar
                        </button>
                    </Link>
                    <p className="new-desc">Nada a mostrar ainda... Inicie suas atividades criando um novo projeto!</p>
                </div>
            </div>
        </>
    );
}
