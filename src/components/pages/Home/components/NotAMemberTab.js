import React from 'react';
import { Link } from 'react-router-dom';

import '../styles.scss';

export default function NotAMemberTab() {
    return(
        <div className="new-main">
            <div className="new-main__content">
                <i className="material-icons">how_to_reg</i>
                <h3 className="new-title" >Quero ser membro</h3>
                <Link to="/account/join">
                    <button className="new-btn">Participar</button>
                </Link>
                <p className="new-desc">Como membro você poderá criar aulas, divulgar seus arranjos e atender a solicitações de arranjos solidários</p>
            </div>
        </div>
    );
}
