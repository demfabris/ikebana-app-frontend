import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/ducks/auth';

export default function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();
    const authKey = useSelector(state => state.auth.keys)

    useEffect(() => {
        dispatch(logout())
    },[])

    useEffect(() => {
        authKey.length === 0 && history.push('/login')
    })

    return(
        <div className="logout-main">
            <h1 className="logout-main__text">Você está sendo redirecionado...</h1>
        </div>
    );
}
