import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from 'services/api';

import { storeUserData, clearUserData } from 'store/ducks/account';
import { refreshAuth } from 'store/ducks/auth';

import Join from './components/Join/Join';
import EditAccount from './components/EditAccount/EditAccount';
import Password from './components/Password/Password';
import NewProject from './components/New/NewProject';
import EditProject from './components/Edit/EditProject';

import './styles.scss';

function Blank() {
    return(
        <>
        </>
    );
}

export default function Account() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const authKey = useSelector(state => state.auth.keys);
    const [isOauth, setIsOauth] = useState(false);


    const hitApi = async (key) => {
        try{
            const response = await api({
                method: 'get',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
            })
            dispatch(storeUserData(response.data))
            response.data.is_oauth && setIsOauth(true)
        } catch(e){
            const refresh_key = authKey[0].refresh_key
            const onExpire = await api({
                method: 'get',
                url: '/refresh',
                headers: {
                    'Authorization': `Bearer ${refresh_key}`
                }
            })
            const { key } = onExpire.data
            dispatch(refreshAuth({ key, refresh_key }))
            window.location.reload()
        } finally {
            setLoading(false)
        }
    }

    //TAB handling
    const [active, setActive] = useState('blank');
    const tabsComponent = {
        'blank': Blank,
        'join': Join,
        'password': Password,
        'edit': EditAccount,
        'new_project': NewProject,
        'edit_project': EditProject
    };
    const ActiveComponent = tabsComponent[active];
    
    useEffect(() => {
        window.scrollTo(0, 0)
        const path = window.location.pathname.slice(9)
        path && setActive(path);
    }, []);

    const handleClick = (action) => () => {
        window.location.pathname = '/account/' + action;
        setActive(action)
    }

    //auth handling
    useEffect(() => {
        if (authKey.length === 0) {
            window.location.pathname = '/login'
            alert('Você precisa entrar para acessar essa página')
        } else {
            hitApi(authKey)
        }

        return () => {
            dispatch(clearUserData())
        }
    }, [])

    return(
        <div className="account">
            <div className="account-main">
                <div className="account-main__sidebar">
                    <ul className="account-main__sidebar--list">
                        <li onClick={handleClick('join')} 
                        className={`tab-element 
                            ${active === 'join' ? 'el-active' : ''}`}>
                            <button className={`tab-element__btn 
                                ${active === 'join' ? 'txt-active' : ''}`}>
                            Participar</button>
                        </li>
                        <li onClick={handleClick('edit')} 
                        className={`tab-element 
                            ${active === 'edit' ? 'el-active' : ''}`}>
                            <button className={`tab-element__btn 
                                ${active === 'edit' ? 'txt-active' : ''}`}>
                            Editar Informações</button>
                        </li>
                        {
                            !loading && !isOauth &&
                                <li onClick={handleClick('password')} 
                                className={`tab-element 
                                    ${active === 'password' ? 'el-active' : ''}`}>
                                    <button className={`tab-element__btn 
                                        ${active === 'password' ? 'txt-active' : ''}`}>
                                    Senha</button>
                                </li>
                        }
                        <li onClick={handleClick('new_project')} 
                        className={`tab-element 
                            ${active === 'new_project' ? 'el-active' : ''}`}>
                            <button className={`tab-element__btn 
                                ${active === 'new_project' ? 'txt-active' : ''}`}>
                            Novo Projeto</button>
                        </li>
                        <li style={{cursor: "auto"}} className={`tab-element 
                            ${active === 'edit_project' ? 'el-active' : ''}`}>
                            <button style={{color: "#969696", cursor: "auto"}} 
                            className={`tab-element__btn 
                                ${active === 'edit_project' ? 'txt-active' : ''}`}>
                            Editar Projeto</button>
                        </li>
                    </ul>
                </div>
                <div className="account-main__container">
                    {
                        !loading &&
                            <ActiveComponent />
                    }
                </div>
            </div>
        </div>
    );
}
