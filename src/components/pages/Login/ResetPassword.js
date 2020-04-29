import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../../../services/api';

import Modal from '../../aux/Modal';
import ErrorDialog from '../../aux/ErrorDialog/ErrorDialog';
import WarningDialog from '../../aux/WarningDialog/WarningDialog';

import IndexFooter from './IndexFooter/IndexFooter';

import './styles.scss';

export default function ResetPassword() {
    const { register, watch, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        !location.search &&  history.goBack()
    },[])

    const onSubmit = async ({ password }) => {
        setLoading(true)
        try {
            const response = await api.post(`/reset_pass${location.search}`, { password })
            setWarning('Senha alterada com sucesso.')
        } catch(e) {
            setError('Link de confirmação expirado.')
        } finally {
            setLoading(false)
        }
    }

    return(
        <>
            <div className="login">
                <section className="wrapper">
                    <div className="login-main">
                        <img className="ike-logo" 
                            src={"https://ikebana-app-content.s3-sa-east-1"+
                                    ".amazonaws.com/static/mainlogo.png"} alt="logo"/>
                        <div className="register-main-info">
                            <p className="register-desc">Escolha uma nova senha.</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="login-main__inputs">
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
                                    <p>Concluir</p>
                                }
                            </button>
                        </form>
                        <div className="login-main__spacer">
                            <div className="spacer-h"></div>
                            <p className="login-main__spacer--text">OU</p>
                            <div className="spacer-h"></div>
                        </div>
                        <div className="login-main__external">
                            <button className="login-google">
                                <p className="login-google--text">Registrar usando</p>
                                <img className="google-logo" 
                                    src="https://image.flaticon.com/icons/svg/281/281764.svg" 
                                    alt="Google" />
                            </button>
                        </div>
                        <div className="login-main__forgot">
                            <p>Resetar senha</p>
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
                        <WarningDialog accept={() => history.push('/login')} 
                        handler={() => setWarning(false)} value={warning}/>
                    </Modal>
            }
        </>
    );
}
