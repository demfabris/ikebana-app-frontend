import React from 'react';
import {
    Link,
    useLocation,
    useHistory
} from 'react-router-dom';

import './styles.scss';

export default function SearchBox({ results, loading }) {
    const location = useLocation();
    const history = useHistory();

    return(
        <div className="search-container">
            <ul className="search-container__results">
                {
                    loading ? 
                            <div className="lds-dual-ring home-loader"></div>
                        :
                    results.length === 0 ?
                        <p className="placeholder-text">Aulas e arranjos...</p>
                        :
                        results.map((el, key) => (
                            <li className="search-container__results--el">
                                <a onClick={() => {
                                        location.pathname.includes('lesson') ?
                                        window.location.pathname=`/lesson/${el.project_id}`
                                        :
                                        history.push(`/lesson/${el.project_id}`)
                                    }}
                                    className="search-container__results--el--text">
                                    {el.name}
                                </a>          
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}
