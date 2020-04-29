import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function NewProjectDisplay() {
    return(
        <>
            <div className="new-main">
                <div className="new-main__content">
                    <i className="material-icons">add_photo_alternate</i>
                    <h3 className="new-title">Novo Projeto</h3>
                    <Link to="/account/new_project">
                        <button className="new-btn">
                                Começar
                        </button>
                    </Link>
                    <p className="new-desc">Adicione novos arranjos, videoaulas ou qualquer conteúdo que desejar compartilhar na plataforma.</p>
                </div>
            </div>
        </>
    );
}
