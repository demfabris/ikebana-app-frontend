import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function IndexFooter() {
    return(
        <div className="index-footer">
            <div className="index-footer-main">
                <ul className="index-footer-main__list">
                    <li><Link to="/explore">EXPLORAR</Link></li>
                    <li><Link to="/motivation">MOTIVAÇÃO</Link></li>
                    <li><Link to="/">INÍCIO</Link></li>
                    <li><a href="https://www.fmo.org.br/sanguetsu/">SOBRE</a></li>
                    <li><a href="https://www.fmo.org.br/">FMO</a></li>
                    <li><a href="https://loja.fmo.org.br/">LOJA</a></li>
                </ul>
                <div className="index-footer-main__trademark">
                    <p className="trademark-text">IKEBANA SANGUETSU, 2020.</p>
                </div>
            </div>
        </div>
    );
}
