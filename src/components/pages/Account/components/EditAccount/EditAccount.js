import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'services/api'
import { useForm } from 'react-hook-form';

import Modal from '../../../../aux/Modal';
import ErrorDialog from '../../../../aux/ErrorDialog/ErrorDialog';
import InfoDialog from '../../../../aux/InfoDialog/InfoDialog';
import WarningDialog from '../../../../aux/WarningDialog/WarningDialog';

import './styles.scss';

export default function EditAccount() {
    const { register, handleSubmit, errors, watch } = useForm();
    const authKey = useSelector(state => state.auth.keys)
    const userData = useSelector(state => state.account.userData[0])
    
    const [filePayload, setFilePayload] = useState(false);
    const [inputFile, setInputFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);
    const [warning, setWarning] = useState(false);
    const [data, setData] = useState(false);

    const handleInputChange = (e) => {
        const file = e.target.files[0]

        if (!file) {
            setError('Selecione alguma foto')
            return void 0
        }
        
        if (((file.size/1024)/1024).toFixed() > 5) {
            setError('Selecione um arquivo menor que 5MB')
            return void 0
        }

        if (!(['image/png', 'image/jpeg'].includes(file.type))){
            setError('Formato inválido, selecione apenas imagens JPG ou PNG')
            return void 0
        }

        setInputFile(URL.createObjectURL(e.target.files[0]))
        setFilePayload(file)
    }

    const onSubmit = async ({ fullname, bio}) => {
        setLoading(true)
        const formData = new FormData()
        try {
            formData.append('file', filePayload)
            formData.append('fullname', fullname)
            formData.append('bio', bio)
            const response = await api({
                method: 'post',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${authKey[0].key}`,
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
            response.data && setInfo('Dados atualizados')
        } catch(e) {
            window.location.pathname = '/refresh'
        } finally {
            setLoading(false)
        }
    }

    const clearNotifications = async () => {
        setLoading(true)
        try {
            const response = await api({
                method: 'delete',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${authKey[0].key}`
                },
            })
            console.log(response.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setData(userData)
    },[])

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="edit">
                    <div className="edit__header">
                        <p className="edit__header--title">Editar informações pessoais.</p>
                    </div>
                    <div className="edit__inputs">
                        <p className="edit__inputs--desc">Informações públicas da conta.</p>
                        <div className="edit__inputs--container acc-field">
                            <label className="input-label acc-field__title" 
                                htmlFor="picture">
                                <img className="edit__inputs--picture" 
                                    src={!inputFile ? data.picture : inputFile} 
                                alt="profile picture"/>
                            </label>
                                <input type="file" ref={register()} 
                                    onChange={handleInputChange} 
                            className="account-input img-input" name="picture" 
                            id="picture"/>
                        </div>
                        <div className="edit__inputs--container acc-field">
                            <label htmlFor="fullname" 
                                className="input-label acc-field__title">Nome Completo</label>
                            <input type="text" ref={register({required: true})} 
                                className="account-input" defaultValue={data.fullname} 
                            name="fullname" id="fullname"/>
                        </div>
                        <div className="edit__inputs--container acc-field">
                            <label htmlFor="email" 
                                className="input-label acc-field__title">E-mail</label>
                            <input type="text" className="account-input email" value={data.email}/>
                        </div>
                        <div className="edit__inputs--container acc-field">
                            <label htmlFor="bio" 
                                className="input-label acc-field__title">Biografia</label>
                            <textarea className="account-input" name="bio" 
                                ref={register({maxLength: 350})} defaultValue={data.bio !== '' ? data.bio : null}
                                placeholder="Faça uma breve descrição sobre você e sua experiência com Ikebana, máximo 350 caractéres." id="bio">
                            </textarea>
                            <p className="bio-counter">{ watch("bio") ? 
                                    watch("bio").length : '' }</p>
                        </div>
                        <div className="edit__inputs--container acc-field">
                            <label className="input-label acc-field__title">
                            Mensagens</label>
                            <button type="button" className="del-btn">
                                {
                                    loading === true ? <div className="sizer">
                                        <div class="lds-ellipsis"><div></div>
                                            <div></div><div></div><div></div></div>
                                    </div>
                                    :
                                    <p onClick={() => setWarning('Deseja realmente excluir todas as notificações?')}>Limpar Notificações</p>
                                }
                            </button>
                        </div>
                        <button type="submit" 
                        className="app-btn btn-filled">
                            {
                                loading === true ? <div className="sizer">
                                    <div class="lds-ellipsis"><div></div>
                                        <div></div><div></div><div></div></div>
                                </div>
                                :
                                <p>{ userData.isPartner === true ? 'Atualizar' : 'Concluir' }</p>
                            }
                        </button>
                    </div>
                </div>
            </form>
            {
                error &&
                    <Modal>
                        <ErrorDialog value={error} handler={() =>{
                            setError(false)
                            window.location.reload()
                        } }/>
                    </Modal>
            }
            {
                info &&
                    <Modal>
                        <InfoDialog value={info} handler={() => {
                            setInfo(false)
                            window.location.reload()
                        }}/>
                    </Modal>
            }
            {
                warning &&
                    <Modal>
                        <WarningDialog value={warning} handler={() => {
                            setWarning(false)
                            window.location.reload()
                        }} accept={async () => {
                            clearNotifications()
                            setWarning(false)
                        }}/>
                    </Modal>
            }
        </>
    );
}
