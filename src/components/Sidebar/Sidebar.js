import React, { useEffect, useState } from 'react';
import {
    Link,
    useLocation,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { changeUrl } from 'store/ducks/links';

import './styles.scss';

export default function Sidebar() {
    const [submenu, setSubmenu] = useState(false)
    const dispatch = useDispatch()
    const activeUrl = useSelector(state => state.links.current.url)

    const handleClick = (url) => {
        dispatch(changeUrl(url))
    }

    const CurrentUrl = () => {
        const current = useLocation();
        return current.pathname.slice(1);
    };

    //Link avaiability
    const active = useSelector(state => state.links.current)
    const authKey = useSelector(state => state.auth.keys)
    const [lock, setLock] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        window.location.pathname.includes('home') && setSubmenu(true)
        if (authKey.length === 0) {
            setLock(true)
        }
    },[])

    return (
        <div className="sidebar" id="main_sidebar">
            <div className="sidebar-menu" id="sidebar_menu">
                <ul className="sidebar-menu__list">
                    {
                        lock ?
                            <li className="sidebar-menu__list--el">
                                <Link to="/register">
                                    <div className="el-wrapper">
                                        <i className="material-icons">how_to_reg</i>
                                        <p className="el-wrapper__text">Registrar</p>
                                    </div>
                                </Link>
                            </li>
                                :
                            <li className="sidebar-menu__list--el">
                                <a className={`
                                ${CurrentUrl().includes('home') ? 
                                        'main-active' :
                                ''}
                            `} onClick={() => {
                                submenu ? setSubmenu(false) : setSubmenu(true)
                            }}>
                                    <div className="el-wrapper">
                                        <i className="material-icons">account_box</i>
                                        <p className="el-wrapper__text">Perfil</p>
                                    </div>
                                </a>
                            </li>

                    }
                    <li className={`accordion ${submenu ? 'popped' : ''}`}>
                        <div className="side-accordion">
                            <ul className="side-accordion__list">
                                <li className="side-accordion__list--el">
                                    <Link to="/home" className={`
                                            ${activeUrl.includes('arrangements') ? 
                                                    'active' :
                                            ''}
                                        `} onClick={() => handleClick('arrangements')}>
                                        <p className="submenu__text">
                                            Arranjos</p>
                                    </Link>
                                </li>
                                <li className="side-accordion__list--el">
                                    <Link to="/home" className={`
                                            ${activeUrl.includes('teaching') ? 
                                                    'active' :
                                            ''}
                                        `} onClick={() => handleClick('teaching')}>
                                        <p className="submenu__text">
                                            Lições</p>
                                    </Link>
                                </li>
                                <li className="side-accordion__list--el">
                                    <Link to="/home" className={`
                                            ${activeUrl.includes('messages') ? 
                                                    'active' :
                                            ''}
                                        `} onClick={() => handleClick('messages')}>
                                        <p className="submenu__text">
                                            Mensagens</p>
                                    </Link>
                                </li>
                                <li className="side-accordion__list--el">
                                    <Link to="/home" className={`
                                            ${activeUrl.includes('new') ? 
                                                    'active' :
                                            ''}
                                        `} onClick={() => handleClick('new')}>
                                        <p className="submenu__text">
                                            Novo Projeto</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="sidebar-menu__list--el">
                        <Link className={`
                                ${CurrentUrl().includes('explore') ? 
                                        'main-active' :
                                ''}
                            `} to="/explore" onClick={() => setSubmenu(false)}>
                            <div className="el-wrapper">
                                <i className="material-icons">apps</i>
                                <p className="el-wrapper__text">Explorar</p>
                            </div>
                        </Link>
                    </li>
                    <li className="sidebar-menu__list--el">
                        <Link className={`
                                ${CurrentUrl().includes('lessons') ? 
                                        'main-active' :
                                ''}
                            `} to="/lessons" onClick={() => setSubmenu(false)}>
                            <div className="el-wrapper">
                                <i className="material-icons">school</i>
                                <p className="el-wrapper__text">Aulas</p>
                            </div>
                        </Link>
                    </li>
                    <li className="sidebar-menu__list--el">
                        <Link to="/motivation" onClick={() => {
                            setSubmenu(false)
                        }}>
                            <div className="el-wrapper">
                                <i className="material-icons">contact_support</i>
                                <p className="el-wrapper__text">Motivação</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
