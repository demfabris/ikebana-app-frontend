import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import api from '../../../services/api';

import './styles.scss';

export default function ConfirmEmail(){
    const location = useLocation();
    const history = useHistory();

    const hitApi = async () => {
        try {
            const res = await api({
                method: 'get',
                url: `/verify${location.search}`,
            })
            console.log(res.data)
        } catch(e) {
            alert('E-mail já confirmado ou link inválido')
        } finally {
            history.push('/login')
        }
    }

    useEffect(() => {
        location.search === '' ?
            history.push('/register')
            :
            hitApi()
    },[])

    return(
        <div className="confirm-email">
            <h1 className="confirm-email--text">E-mail confirmado, você está sendo redirecionado.</h1>
            <div className="sizer">
                <div class="lds-ellipsis redirect"><div></div>
                    <div></div><div></div><div></div></div>
            </div>

        </div>
    );
}
