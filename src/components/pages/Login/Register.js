import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../../../services/api';

import Modal from '../../aux/Modal';
import ErrorDialog from '../../aux/ErrorDialog/ErrorDialog';
import WarningDialog from '../../aux/WarningDialog/WarningDialog';

import IndexFooter from './IndexFooter/IndexFooter';

import './styles.scss';

export default function Register() {
    const { register, watch, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const history = useHistory();


    const onSubmit = async ({ email, fullname, password }) => {
        setLoading(true)
        try {
            const response = await api.post('/user_register', { email, fullname, password })
            setWarning('Registro completo, acesse seu e-mail para confirmação.')
        } catch(e) {
            setError('Erro, e-mail já está registrado.')
        } finally {
            setLoading(false);
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
                    <div className="login-main register-main">
                        <img className="ike-logo" 
                            src={"https://ikebana-app-content.s3-sa-east-1"+
                                    ".amazonaws.com/static/mainlogo.png"} alt="logo"/>
                        <div className="register-main-info">
                            <p className="register-desc">Registre-se para aproveitar 
                                todos os recursos do website.</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="login-main__inputs register-inputs">
                                <div className="input-wrapper">
                                    <input className="login-input" name="email" type="text" 
                                        ref={ register({ required: true, maxLength: 30, 
                                            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                        placeholder="E-mail"/>
                                    { errors.email && errors.email.type === 'pattern' &&
                                    <div title="Formato inválido" className="validation-overlay">
                                        <i className="material-icons">
                                            error_outline</i></div> }
                                    { errors.email && errors.email.type === 'required' &&
                                        <div title="Campo necessário" className="validation-overlay">
                                            <i className="material-icons">
                                                error_outline</i></div> }
                                </div>
                                <div className="input-wrapper">
                                    <input className="login-input" name="fullname" type="text" 
                                        ref={ register({ required: true, maxLength: 50 })} 
                                        placeholder="Nome Completo"/>
                                    { errors.fullname && errors.fullname.type === 'required' && 
                                    <div title="Campo necessário" className="validation-overlay">
                                        <i className="material-icons">
                                            error_outline</i></div> }
                                </div>
                                <div className="input-wrapper">
                                    <input className="login-input" name="password" type="password" 
                                        ref={ register({ required: true, minLength: 6 }) } 
                                        placeholder="Senha"/>
                                    {errors.password && <div title="Mínimo de 6 caracteres" 
                                        className="validation-overlay">
                                        <i className="material-icons">error_outline</i></div> }
                                </div>
                                <div className="input-wrapper">
                                    <input className="login-input" name="confirm_pass" type="password" 
                                        ref={ register({ required: true, 
                                            validate: value => value === watch('password') }) } 
                                        placeholder="Confirmar senha"/>
                                    {errors.confirm_pass && <div title="As senhas não coincidem" 
                                        className="validation-overlay">
                                        <i className="material-icons">error_outline</i></div> }
                                </div>
                            </div>
                            <button type="submit" className="login-btn">
                                {
                                    loading === true ? <div className="sizer">
                                        <div class="lds-ellipsis"><div></div>
                                            <div></div><div></div><div></div></div>
                                    </div>
                                    :
                                    <p>Registrar</p>
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
                            <button className="forgot-btn">
                                <Link to="/forgot_pass">Esqueceu sua senha?</Link>
                            </button>
                        </div>
                    </div>
                    <div className="login-bottom">
                        <p className="login-bottom--text">Já tem uma conta?
                            <button className="register-btn">
                                <Link to="/login">Entrar</Link>
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
                        <ErrorDialog handler={() => setError(false)}
                            value={error}/>
                    </Modal>
            }
            {
                warning &&
                    <Modal>
                        <WarningDialog handler={() => setWarning(false)} 
                        accept={() => history.push('/login')} value={warning} />
                    </Modal>
            }
        </>
    );
}
