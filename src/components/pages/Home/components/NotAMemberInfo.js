import React from 'react';

import '../styles.scss';

export default function NotAMemberInfo() {
    return (
        <div className="profile-about shorten">
            <ul className="profile-about__tabs">
                <li className="profile-about__tabs--el about-active">
                    <p className="profile-about__tabs--el--text">
                        Professor?
                    </p>
                </li>
            </ul>
            <ul className="profile-about__display">
                <li className="profile-about__display--el">
                    <h2 style={{fontWeight: "500", fontSize: "1.1em", color: "#65676b"}}>
                        Torne-se membro para usufruir de todos os recursos do website.</h2>
                </li>
            </ul>
        </div>
    );
}
