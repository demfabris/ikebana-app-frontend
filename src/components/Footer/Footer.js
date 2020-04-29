import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function Footer() {
    return(
        <div className="footer-main" id="footer_main">
            <div className="footer-main__content">
                <ul className="footer-main__content--list">
                    <li><a onClick={() => window.location.pathname = "/"}>
                    INÍCIO</a></li>
                    <li><a onClick={() => 
                    window.location.pathname = "/login"}>LOGIN</a></li>
                    <li><a target="_blank" 
                        href="https://fmo.org.br">FMO</a></li>
                    <li><a target="_blank"
                        href="https://www.fmo.org.br/noticias/">
                    NOTÍCIAS
                    </a></li>
                    <li><a target="_blank" 
                        href="https://loja.fmo.org.br/">LOJA</a></li>
                    <li><a target="_blank" 
                        href="https://www.fmo.org.br/a-fmo/">
                        SOBRE
                    </a></li>
                    <li>
                        <p className="footer-desc">Fundação 
                        Mokiti Okada 2020</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}
