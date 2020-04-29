import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'services/api'
import { useForm } from 'react-hook-form';

import Modal from '../../../../aux/Modal';
import ErrorDialog from '../../../../aux/ErrorDialog/ErrorDialog';
import InfoDialog from '../../../../aux/InfoDialog/InfoDialog';

import './styles.scss';

export default function Join() {
    const { register, handleSubmit, errors, watch } = useForm();
    const authKey = useSelector(state => state.auth.keys)
    const userData = useSelector(state => state.account.userData[0])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);
    const [data, setData] = useState({})

    const onSubmit = async ({ city, tel, personal_address, location, work_address, accept}) => {
        setLoading(true)
        try {
            if (accept) {
                const response = await api({
                    method: 'post',
                    url: '/become_partner',
                    headers: {
                        'Authorization': `Bearer ${authKey[0].key}`
                    },
                    data: {
                        city,
                        tel,
                        personal_address,
                        location,
                        work_address,
                    }
                })
                response.data.response && setInfo('Dados Atualizados')
                response.data.success && setInfo('Você virou membro')
            }
        } catch(e) {
            console.log(e)
            // window.location.pathname = '/refresh'
        } finally {
            setLoading(false)
        }
    }

    //loading user data
    useEffect(() => {
        setData(userData)
    }, [])

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="join">
                    <div className="join__header">
                        <p className="join__header--title">Por favor complete os dados para poder ser um membro do projeto.</p>
                    </div>
                    <div className="join__inputs">
                        <p className="edit__inputs--desc">Informações pessoais.</p>
                        <div className="join__inputs--container acc-field">
                            <label htmlFor="city" 
                                className="input-label acc-field__title">Cidade</label>
                            <input type="text" className="account-input" id="city" name="city" 
                                defaultValue={data.city}
                                ref={ register({ required: true, maxLength: 25 }) }/>
                        </div>
                        <div className="join__inputs--container acc-field">
                            <label htmlFor="tel" 
                                className="input-label acc-field__title">
                                Telefone</label>
                            <input type="text" className="account-input" name="tel" 
                                defaultValue={data.tel}
                                ref={ register({ required: true, maxLength: 15 }) } 
                                id="tel"/>
                        </div>
                        <div className="join__inputs--container acc-field">
                            <label htmlFor="personal_address" 
                                className="input-label acc-field__title">
                                Endereço</label>
                            <input type="text" className="account-input" name="personal_address" 
                                defaultValue={data.personal_address} ref={ register({ required: true }) }
                                id="personal_address"/>
                        </div>
                        <p className="join__inputs--desc">Informações do local que frequenta.</p>
                        <div className="join__inputs--container acc-field">
                            <label htmlFor="location" 
                                className="input-label acc-field__title">Local</label>
                            <input type="text" className="account-input" id="location" name="location" 
                                defaultValue={data.location} ref={ register({ required: true }) }
                                placeholder="Ex. Johrei Center"/>
                        </div>
                        <div className="join__inputs--container acc-field">
                            <label htmlFor="work_address" 
                                className="input-label acc-field__title">
                                Endereço</label>
                            <input type="text" className="account-input" id="work_address" name="work_address" 
                                defaultValue={data.work_address} ref={ register({ required: true }) }/>
                        </div>
                    </div>
                    <div className="join__agreement">
                        <p className="join__agreement--text">Como membro você poderá contribuir com o conteúdo 
                            do website, adicionar aulas sobre o método Sanguetsu e publicar seus arranjos. Também 
                            poderá atender a solicitações de arranjos de pessoas da sua região.</p>
                        <div className="join__agreement--check">
                            { errors.accept && <i className="material-icons" style={{color: "red"}}>error_outline</i> }
                            <label htmlFor="accept">{userData.isPartner === true ? 'Confirmar atualização' : 'Quero ser membro'}</label>
                            <input type="checkbox" id="accept" name="accept" ref={ register({ required: true }) }/>
                            <button type="submit" className="app-btn btn-filled">
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
                </div>
            </form>
            {
                error &&
                    <Modal>
                        <ErrorDialog value={error} handler={() =>{
                            setError(false)
                            window.location.pathname = '/logout'
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
