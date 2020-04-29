import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';
import { storeAuth  } from '../../../store/ducks/auth';
import { useForm } from 'react-hook-form';

import IndexFooter from './IndexFooter/IndexFooter';
import ErrorDialog from '../../aux/ErrorDialog/ErrorDialog';
import InfoDialog from '../../aux/InfoDialog/InfoDialog';
import Modal from '../../aux/Modal';

import './styles.scss';

export default function ForgotPassword() {
    const { register, handleSubmit, errors } = useForm();
    const [loading2, setLoading2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);

    const history = useHistory();

    const onSubmit = async ({ email }) => {
        setLoading(true)
        try {
            const response = await api.post('/recover_pass', { email })
            setInfo('E-mail de confirmação enviado.')
        } catch(e) {
            e.message.includes('403') && setError('E-mail não existe no banco de dados.')
        } finally {
            setLoading(false)
        }
    }

    const oAuth = async () => {
        setLoading2(true)
        try {
            const response = await api({
                method: 'get',
                url: '/oauth_login'
            })
            console.log(response.data.request_uri)
            window.location.replace(response.data.request_uri)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading2(false)
        }
    }

    return(
        <>
            <div className="login">
                <section className="wrapper">
                    <div className="login-main forgot">
                        <img className="ike-logo" 
                            src={"https://ikebana-app-content.s3-sa-east-1"+
                                    ".amazonaws.com/static/mainlogo.png"} alt="logo"/>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="login-main__inputs forgot-inputs">
                                <div className="input-wrapper">
                                    <input className="login-input" name="email" 
                                        type="text" ref={ register({ required: true, 
                                            maxLenght: 30, 
                                            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                        placeholder="E-mail"/>
                                    {errors.email && <div title="Campo necessário ou formato inválido" 
                                        className="validation-overlay"><i className="material-icons">
                                            error_outline</i></div>}
                                </div>
                            </div>
                            <button type="submit" className="login-btn">
                                {
                                    loading === true ? <div className="sizer">
                                        <div class="lds-ellipsis"><div></div>
                                            <div></div><div></div><div></div></div>
                                    </div>
                                    :
                                    <p>Enviar e-mail</p>
                                }

                            </button>
                        </form>
                        <div className="login-main__spacer">
                            <div className="spacer-h"></div>
                            <p className="login-main__spacer--text">OU</p>
                            <div className="spacer-h"></div>
                        </div>
                        <div className="login-main__external">
                            <button onClick={() => oAuth()} className="login-google">
                                {
                                    loading2 === true ? <div className="sizer">
                                        <div className="lds-ellipsis"><div></div>
                                            <div></div><div></div><div></div></div>
                                    </div>
                                       :
                                       <>
                                    <p className="login-google--text">Entrar usando</p>
                                    <img className="google-logo" 
                                        src="https://image.flaticon.com/icons/svg/281/281764.svg" 
                                        alt="Google" />
                                       </>
                                }
                            </button>
                        </div>
                        <div className="login-main__forgot">
                            <p>Recuperar senha</p>
                        </div>
                    </div>
                    <div className="login-bottom">
                        <p className="login-bottom--text">Não tem uma conta?
                            <button className="register-btn">
                                <Link to="/register">Criar</Link>
                            </button>
                        </p>
                    </div>
                    <div className="get-info">Em breve...</div>
                    <div className="login-get-btn">
                        <button className="appstore-btn">
                            <img src="https://ikebana-app-content.s3-sa-east-1.amazonaws.com/static/app-store-badge.png" alt="App store" />
                        </button>
                        <button className="playstore-btn">
                            <img src="https://play.google.com/intl/pt-BR/badges/static/images/badges/pt-br_badge_web_generic.png" alt="Play store" />
                        </button>
                    </div>
                </section>

                <IndexFooter />
            </div>
            {
                error &&
                    <Modal>
                        <ErrorDialog handler={() => setError(false)} value={error}/>
                    </Modal>
            }
            {
                info &&
                    <Modal>
                        <InfoDialog handler={() => setInfo(false)} value={info}/>
                    </Modal>
            }
        </>
    );
}
