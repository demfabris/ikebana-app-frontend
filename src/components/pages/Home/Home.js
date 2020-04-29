import React, { useState, useEffect } from 'react';
import { Link,
    useHistory,
    useLocation,
    Route,
    BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../../services/api';
import { changeUrl } from 'store/ducks/links';
import { refreshAuth } from 'store/ducks/auth';

import './styles.scss';

import ArrangementWrapper from '../../list_elements/Arrangement/ArrangementWrapper';
import LessonWrapper from '../../list_elements/Lesson/LessonWrapper';
import MessageWrapper from '../../list_elements/Message/MessageWrapper';
import NewWrapper from '../../list_elements/New/NewWrapper';
import Modal from '../../aux/Modal';
import SettingsDialog from '../../aux/SettingsDialog/SettingsDialog';
import ErrorDialog from '../../aux/ErrorDialog/ErrorDialog';

import MemberInfo from './components/MemberInfo';
import NotAMemberInfo from './components/NotAMemberInfo';
import NotAMemberTab from './components/NotAMemberTab';

export default function Home() {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const active = useSelector(state => state.links.current.url)

    const handleClick = (url) => {
        dispatch(changeUrl(url))
    }

    //Tabs
    const tabs = {
        'arrangements': ArrangementWrapper,
        'teaching': LessonWrapper,
        'messages': MessageWrapper,
        'new': NewWrapper
    }
    const ActiveComponent = tabs[active]

    //Defaults
    const defaults = useSelector(state => state.defaults.data)

    //Edit Settings
    const [settings, setSettings] = useState(false);

    //Data fetching
    const [data, setData] = useState(false);
    const [member, setMember] = useState(false);
    const authKey = useSelector(state => state.auth.keys)

    const hitApi = async (key) => {
        try{
            const response = await api({
                method: 'get',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
            })
            setData(response.data)
            response.data.isPartner && setMember(true)
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

    useEffect(() => {
        if (authKey.length === 0) {
            window.location.pathname = '/logout'
            alert('Você precisa entrar para acessar essa página')
        } else {
            hitApi(authKey)
        }

    }, [])

    const joinDate = Date.parse(data.createdOn)
    const created = new Date(joinDate)

    return(
        <>
            <div className="profile">
                <div className="profile-main">
                    <div className="profile-main__header">
                    {
                        loading ?
                            <div className="lds-dual-ring home-loader"></div>
                            :
                        <div className="profile-main__header--info">
                            <div className="picture-wrapper">
                                <div className="profile-picture picture-overlay">
                                    <Link to="/account/edit" 
                                        className="picture-overlay__text">Editar foto</Link>
                                </div>
                                    <img className="profile-picture" src={data.picture} 
                                        alt="Profile pic"/>
                            </div>
                            <div className="profile-title">
                                <div className="profile-title__email">{data.email}</div>
                                <div className="profile-title__fullname">{data.fullname}</div>
                                <div className="profile-title__joindate">
                                    <p className="profile-title__joindate--text">
                                        Entrou: 
                                        {' ' + created.getDate()
                                        }/{1 + created.getMonth()
                                        }/{created.getFullYear()}
                                    </p>
                                </div>
                                <div className="profile-title__status">
                                    {
                                        member ? 
                                            <p className="profile-title__status--text"
                                                style={{color: "green"}}>Membro
                                                <i className="material-icons" 
                                                    style={{color: "green"}}>check</i>
                                            </p>
                                            :
                                            <p className="profile-title__status--text"
                                                style={{color: "red"}}>Membro
                                                <i className="material-icons" 
                                                    style={{color: "red"}}>close</i>
                                            </p>
                                    }
                                </div>
                            </div>
                        </div>
                        }
                        <div className="profile-main__header--more">
                            <div className="profile-bio">
                                {
                                    data.bio ?
                                    <p className="profile-bio__text">
                                        {data.bio}
                                    </p>
                                    :
                                    <>
                                        <p className="profile-bio__text">
                                            Conte-nos sobre você escrevendo um texto de apresentação...
                                        </p>
                                        <Link to="/account/edit" className="profile-bio__edit">
                                            <i className="material-icons">edit</i>
                                        </Link>
                                    </>
                                }
                            </div>
                            <div className="profile-edit">
                                <button onClick={() => setSettings(true)} 
                                    className="profile-edit__btn">
                                    <p className="profile-edit__btn--text">
                                        <i className="material-icons">settings</i>
                                        Configurações
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    member ?
                        <MemberInfo {...data}/>
                        :
                        <NotAMemberInfo />
                }
                <div className="profile-line">
                    <ul className="profile-line__list">
                        <li onClick={() => handleClick('arrangements')}
                            className={`profile-line__list--el 
                            ${active === 'arrangements' ? 'tab-active' : ''}`}>
                            <a className="profile-tab">
                                <div className="text-wrapper">
                                    <i className="material-icons">local_florist</i>
                                    <p className="profile-tab__text">Arranjos</p>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => handleClick('teaching')} 
                            className={`profile-line__list--el 
                            ${active === 'teaching' ? 'tab-active' : ''}`}>
                            <a className="profile-tab">
                                <div className="text-wrapper">
                                    <i className="material-icons">class</i>
                                    <p className="profile-tab__text">Aulas</p>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => handleClick('messages')}
                            className={`profile-line__list--el 
                            ${active === 'messages' ? 'tab-active' : ''}`}>
                            <a className="profile-tab">
                                <div className="text-wrapper">
                                    <i className="material-icons">notifications</i>
                                    <p className="profile-tab__text">Notificações</p>
                                </div>
                            </a>
                        </li>
                        <li onClick={() => handleClick('new')} 
                            className={`profile-line__list--el 
                            ${active === 'new' ? 'tab-active' : ''}`}>
                            <a className="profile-tab">
                                <div className="text-wrapper">
                                    <i className="material-icons">add_circle</i>
                                    <p className="profile-tab__text">Criar</p>
                                </div>
                            </a>
                        </li>
                    </ul>   
                </div>
                <div className="profile-display">
                    {
                        member ?
                            <ActiveComponent />                   
                            :
                            <NotAMemberTab/>
                    }
                </div>
            </div>
            {
                settings &&
                    <Modal>
                        {
                            data.is_oauth ?
                                <SettingsDialog data={{
                                    'Tornar-se Membro': '/account/join',
                                    'Informações': '/account/edit'
                                }} handler={() => setSettings(false)}/>
                                   :
                                <SettingsDialog data={{
                                    'Tornar-se Membro': '/account/join',
                                    'Informações': '/account/edit',
                                    'Senha': '/account/password'
                                }} handler={() => setSettings(false)}/>
                        }
                    </Modal>
            }
        </>
    );
}
