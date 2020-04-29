import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function SettingsDialog({ data, handler }) {

    return (
        <div className="settings" onClick={handler}>
            <div className="settings-main scale-in-center">
                {
                    Object.entries(data).map((el, key) => (
                        <div key={key} className="settings-main__el">
                            <Link to={el[1]} >
                                <p className="settings-main__el--text">
                                    {el[0]}
                                </p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
