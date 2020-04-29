import React, { useState,useEffect } from 'react';
import api from '../../../services/api';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeAuth } from 'store/ducks/auth.js'

import Modal from '../../aux/Modal';
import ErrorDialog from '../../aux/ErrorDialog/ErrorDialog';

export default function Oauth() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    const loginOauth = async () => {
        try {
            const response = await api({
                method: 'get',
                url: `/callback${location.search}`
            })
            const { key, refresh_key } = response.data
            dispatch(storeAuth({key, refresh_key}))
            history.push('/login')
        } catch(e) {
            setError('Erro interno, pode já haver uma conta com este endereço de e-mail')
        }
    }

    useEffect(() => {
        loginOauth()
    }, [])

    return(
        <>
            <div className="logout-main">
                <h1 className="logout-main__text">Você está sendo redirecionado...</h1>
            </div>
            {
                error &&
                    <ErrorDialog handler={() => history.push('/login')} value={error} />
            }
        </>
    );
}
