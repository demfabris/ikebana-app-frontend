import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';
import { storeAuth  } from 'store/ducks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Modal from '../../aux/Modal';
import ErrorDialog from '../../aux/ErrorDialog/ErrorDialog';

import IndexFooter from './IndexFooter/IndexFooter';

import './styles.scss';

export default function Login() {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const authKey = useSelector(state => state.auth.keys)

    const onSubmit = async ({ email, password }) => {
        setLoading(true)
        try {
            const response = await api({
                method: 'post',
                url: '/login',
                data: { email, password },
            })
            const { key, refresh_key } = response.data
            dispatch(storeAuth({key, refresh_key}))
            history.push('/explore')
        } catch(e) {
            e.message.includes('403') && setError('E-mail inserido ainda não foi confirmado')
            e.message.includes('401') && setError('E-mail ou senha inválido(s)')
            e.message.includes('400') && setError('E-mail já registrado, clique em entrar usando sua conta Google')
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


    useEffect(() => {
        if (authKey.length !== 0) {
            history.push('/explore')
        } 
    },[])

    return(
        <>
            <div className="login">
                <section className="wrapper">
                    <div className="login-main">
                        <img className="ike-logo" 
                            src={"https://ikebana-app-content.s3-sa-east-1"+
                                    ".amazonaws.com/static/mainlogo.png"} alt="logo"/>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="login-main__inputs">
                                <div className="input-wrapper">
                                    <input className="login-input" name="email" 
                                        type="text" ref={ register({ required: true }) } 
                                        placeholder="Usuário"/>
                                    {errors.email && <div title="Campo necessário" 
                                        className="validation-overlay"><i className="material-icons">
                                            error_outline</i></div>}
                                </div>
                                <input  className="login-input" name="password" 
                                    type="password" ref={ register } placeholder="Senha" />
                            </div>
                            <button type="submit" className="login-btn">
                                {
                                    loading === true ? <div className="sizer">
                                        <div className="lds-ellipsis"><div></div>
                                            <div></div><div></div><div></div></div>
                                    </div>
                                    :
                                    <p>Entrar</p>
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
                                <Link to="/forgot_pass">
                                    Esqueceu sua senha?
                                </Link>
                            </button>
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
        </>
    );
}
