import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function Index() {
    return(
        <div class="index">
            <div className="index-main">
                <img className="underlay-index" src="https://ikebana-app-content.s3-sa-east-1.amazonaws.com/static/mainlogo_transparent_notext.png" alt="Logo" />
                <div className="index-main__header">
                    <div className="index-main__header--logo">
                        <img className="index-main__header--logo--img" src="https://ikebana-app-content.s3-sa-east-1.amazonaws.com/static/mainlogo_transparent_notext.png" alt="Logo" />
                        <p className="index-main__header--logo--text">sanguetsu</p>
                    </div>
                    <ul className="index-main__header--links">
                        <div className="index-main__header--links--hamburguer">
                            <div></div>
                        </div>
                        <li className="index-main__header--links--el"><a target="_blank" 
                            href="https://www.fmo.org.br/">Fundação</a></li>
                        <li className="index-main__header--links--el"><a target="_blank" 
                            href="https://www.fmo.org.br/noticias/">Noticias</a></li>
                        <li className="index-main__header--links--el"><a target="_blank" 
                            href="http://loja.fmo.org.br/">Loja</a></li>
                        <li className="index-main__header--links--el"><a target="_blank" 
                            href="https://www.fmo.org.br/a-fmo/">Sobre</a></li>
                    </ul>
                </div>
                <div className="index-main__content">
                    <h1 className="index-main__content--title1">ikebana</h1>
                    <h1 className="index-main__content--title2">sanguetsu</h1>
                    <p className="index-main__content--desc">Conecte-se com praticantes do método Sanguetsu e compartilhe conhecimento.</p>
                </div>
                <div className="index-main__buttons">
                    <Link to="/login">
                        <button className="index-main__buttons--login">
                            <div className="btn-wrapper">
                                <i className="material-icons">how_to_reg</i>
                                <p className="index-main__buttons--login--text">Entrar</p>
                            </div>
                        </button>
                    </Link>
                    <Link to="/explore">
                        <button className="index-main__buttons--explore">
                            <div className="btn-wrapper">
                                <i className="material-icons">apps</i>
                                <p className="index-main__buttons--explore--text">Explorar</p>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="index-footer-landing">
                <ul className="index-footer-landing__social">
                    <li className="index-footer-landing__social--link">
                        <a target="_blank" href="https://www.fmo.org.br/">
                            <img className="footer-logo" 
                                src={"https://ikebana-app-content.s3-sa-east-1."+
                                        "amazonaws.com/static/logotipo_notext.png"}
                                alt="FMO" />
                        </a>
                    </li>
                    <li className="index-footer-landing__social--link">
                        <a target="_blank"
                            href="https://www.facebook.com/FundacaoMokitiOkadaMOA/">
                            <img className="footer-logo" 
                                src={"https://ikebana-app-content.s3-sa-east-1.amazon"+
                                        "aws.com/static/facebook.svg"} alt="facebook" />
                        </a>
                    </li>
                    <li className="index-footer-landing__social--link">
                        <a href={"https://www.youtube.com/channel/UCJg-nQqbJ"+
                                "5v-CVGVqevrIKQ"} target="_blank"><img className="footer-logo" 
                                    src={"https://ikebana-app-content.s3-sa-east-1.amazon"+
                                            "aws.com/static/youtube.svg"} alt="youtube" />
                        </a>
                    </li>
                    <li className="index-footer-landing__social--link">
                        <a href={"https://www.instagram.com/fundacaomokitiokada/"} 
                            target="_blank"><img className="footer-logo" 
                                src={"https://ikebana-app-content.s3-sa-east-1.amazon"+
                                        "aws.com/static/instagram.svg"} alt="youtube" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
