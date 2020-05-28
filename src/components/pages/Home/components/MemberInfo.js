import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from 'services/api';

import '../styles.scss';

export default function MemberInfo(data) {
    const [tab, setTab] = useState(1);
    const [loading, setLoading] = useState(false);
    const [adminInfo, setAdminInfo] = useState();

    const authKey = useSelector(state => state.auth.keys)

    const hitApi = async (key=authKey) => {
        setLoading(true)
        try{
            const response = await api({
                method: 'get',
                url: '/admin_info',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
            })
            setAdminInfo(response.data)
            console.log(response.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        data.id === 1 && hitApi()
    },[])

    const partnerOn = Date.parse(data.partnerWhen)
    const turnedPartner = new Date(partnerOn)

    return (
        <div className="profile-about">
            <ul className="profile-about__tabs">
                <li onClick={() => setTab(1)} className={`profile-about__tabs--el ${tab === 1 ? 'about-active' : ''}`}>
                    <p className="profile-about__tabs--el--text">
                        Visão geral
                    </p>
                </li>
                <li onClick={() => setTab(2)} className={`profile-about__tabs--el ${tab === 2 ? 'about-active' : ''}`}>
                    <p className="profile-about__tabs--el--text">
                        Atuação
                    </p>
                </li>
                <li onClick={() => setTab(3)} className={`profile-about__tabs--el ${tab === 3 ? 'about-active' : ''}`}>
                    <p className="profile-about__tabs--el--text">
                        Estatísticas
                    </p>
                </li>
                {
                    data.id === 1 &&
                        <li onClick={() => setTab(4)} className={`profile-about__tabs--el ${tab === 4 ? 'about-active' : ''}`}>
                            <p className="profile-about__tabs--el--text">
                                Administrador
                            </p>
                        </li>
                }
            </ul>
            {
                tab === 1 &&
                    <ul className="profile-about__display">
                        <li className="profile-about__display--el">
                            <i className="material-icons">location_on</i>
                            <p className="profile-about__display--el--text">
                                {data.city}
                            </p>
                        </li>
                        <li className="profile-about__display--el">
                            <i className="material-icons">home</i>
                            <p className="profile-about__display--el--text">
                                {data.personal_address}
                            </p>
                        </li>
                        <li className="profile-about__display--el">
                            <i className="material-icons">phone</i>
                            <p className="profile-about__display--el--text">
                                {data.tel}
                            </p>
                        </li>
                    </ul>
            }
            {
                tab === 2 &&
                    <ul className="profile-about__display">
                        <li className="profile-about__display--el">
                            <i className="material-icons">location_on</i>
                            <p className="profile-about__display--el--text">
                                {data.location}
                            </p>
                        </li>
                        <li className="profile-about__display--el">
                            <i className="material-icons">bookmark</i>
                            <p className="profile-about__display--el--text">
                                {data.work_address}
                            </p>
                        </li>
                        <li className="profile-about__display--el">
                            <i className="material-icons">group</i>
                            <p className="profile-about__display--el--text">
                                <b style={{fontSize: "0.9em", fontWeight: "500"}}>Membro desde: </b>
                                {' ' + turnedPartner.getDate()
                                }/{1 + turnedPartner.getMonth()
                                }/{turnedPartner.getFullYear()}
                            </p>
                        </li>
                    </ul>
            }
            {
                tab === 3 &&
                    <ul className="profile-about__display">
                        <li className="profile-about__display--el">
                            <i className="material-icons">bar_chart</i>
                            <p className="profile-about__display--el--text">
                                {data.projects_amount} Projeto(s)
                            </p>
                        </li>
                        <li className="profile-about__display--el">
                            <i className="material-icons">compare_arrows</i>
                            <p className="profile-about__display--el--text">
                                {data.total_orders} Pedido(s)
                            </p>
                        </li>
                    </ul>
            }
            {
                tab === 4 &&
                        <ul className="profile-about__display">
                            <li className="profile-about__display--el">
                                <i className="material-icons">perm_contact_calendar</i>
                                <p className="profile-about__display--el--text">
                                    {adminInfo.users} Usuários cadastrados
                                </p>
                            </li>
                            <li className="profile-about__display--el">
                                <i className="material-icons">photo_album</i>
                                <p className="profile-about__display--el--text">
                                    {adminInfo.projects} Projetos criados
                                </p>
                            </li>
                            <li className="profile-about__display--el">
                                <i className="material-icons">supervisor_account</i>
                                <Link to="/admin" className="profile-about__display--el--text">
                                    Acessar área de administrador
                                </Link>
                            </li>
                        </ul>
            }
        </div>
    );
}
