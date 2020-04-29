import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import api from 'services/api'
import { useForm } from 'react-hook-form';

import Modal from '../../../../aux/Modal';
import ErrorDialog from '../../../../aux/ErrorDialog/ErrorDialog';
import InfoDialog from '../../../../aux/InfoDialog/InfoDialog';

import './styles.scss';

export default function Password() {
    const { register, handleSubmit, errors, watch } = useForm();
    const authKey = useSelector(state => state.auth.keys)
    const userData = useSelector(state => state.account.userData[0])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);
    const [data, setData] = useState({})
    const [member, setMember] = useState(false);
    const history = useHistory();

    const onSubmit = async ({ old_pass, new_pass, confirm_pass }) => {
        setLoading(true)
        try {
            const response = await api({
                method: 'post',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${authKey[0].key}`,
                },
                data: {
                    old_pass,
                    new_pass,
                    confirm_pass
                }
            })
            response.data.password && setInfo('Senha alterada com sucesso.')
        } catch(e) {
            e.message.includes('401') && setError("Senha atual incorreta")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setData(userData)
        data.isPartner && setMember(true)
    }, [])

    return(
        <>
        <div className="password">
            <div className="password__header">
                <p className="password__header--title">Editar informações pessoais.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="password__inputs">
                    <p className="password__inputs--desc">Editar senha</p>
                    <div className="password__inputs--container acc-field">
                        <label htmlFor="old_pass"
                            className="input-label acc-field__title">
                            Senha Antiga</label>
                        <input ref={register({required: true, minLength: 6})} name="old_pass" 
                            type="password" className="account-input" id="old_pass"/>
                    </div>
                    <div className="password__inputs--container acc-field">
                        <label htmlFor="new_pass" 
                            className="password-label acc-field__title">
                            Senha Nova
                            {errors.new_pass && <div title="Mínimo de 6 caracteres" 
                                className="validation-overlay-acc">
                                <i className="material-icons">error_outline</i></div> }
                        </label>
                        <input type="password" ref={register({required: true, minLength: 6})} 
                            name="new_pass" className="account-input" id="new_pass"/>
                    </div>
                    <div className="password__inputs--container acc-field">
                        <label htmlFor="confirm_pass" 
                            className="input-label acc-field__title">
                            Confirmar Senha
                            {errors.confirm_pass && <div title="As senhas não coincidem" 
                            className="validation-overlay-acc">
                            <i className="material-icons">error_outline</i></div> }
                        </label>
                        <input ref={register({required: true, minLength: 6,
                            validate: value => value === watch('new_pass') }) } 
                            name="confirm_pass" type="password" className="account-input" 
                            id="confirm_pass"/>
                    </div>
                    <button type="submit" className="app-btn btn-filled">
                        {
                            loading === true ? <div className="sizer">
                                <div class="lds-ellipsis"><div></div>
                                    <div></div><div></div><div></div></div>
                            </div>
                            :
                            <p>{ member === true ? 'Atualizar' : 'Concluir' }</p>
                        }
                    </button>
                </div>
            </form>
        </div>
            {
                error &&
                    <Modal>
                        <ErrorDialog value={error} handler={() =>{
                            setError(false)
                        } }/>
                    </Modal>
            }
            {
                info &&
                    <Modal>
                        <InfoDialog value={info} handler={() => {
                            setInfo(false)
                            window.location.pathname = '/home'
                        }}/>
                    </Modal>
            }
        </>
    );
}
