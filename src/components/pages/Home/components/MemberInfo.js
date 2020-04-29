import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import '../styles.scss';

export default function MemberInfo(data) {
    const [tab,setTab] = useState(1);

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
                                <p style={{fontSize: "0.9em", fontWeight: "500"}}>Membro desde: </p>
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
        </div>
    );
}
