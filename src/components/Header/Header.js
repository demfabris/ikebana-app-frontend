import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeUrl } from 'store/ducks/links';
import { loadNotif } from 'store/ducks/notifications';
import { refreshAuth } from 'store/ducks/auth';
import {DebounceInput} from 'react-debounce-input';

import SettingsDialog from '../aux/SettingsDialog/SettingsDialog';
import SearchBox from '../aux/SearchBox/SearchBox';
import Modal from '../aux/Modal';
import api from '../../services/api';

import './styles.scss';

import Clipper from '../aux/Clipper/Clipper';

//Page names
const Pages = {
    'explore' : 'Explorar',
    'account' : 'Conta',
    'home' : 'Perfil',
    'lessons' : 'Aulas',
    'lesson' : 'Aula'
};
const CurrentUrl = () => {
    let active = useLocation();
    return active.pathname.slice(1).split('/')[0];
}

export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();

    //shrink on scroll
    useEffect(() => {
        window.onscroll = function() {shrinkOnScroll()};
        const shrinkOnScroll = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {

            if (window.location.pathname !== '/motivation' &&
                window.location.pathname !== '/register' &&
                window.location.pathname !== '/login' &&
                window.location.pathname !== '/forgot_pass' &&
                window.location.pathname !== '/logout') {
                    document.getElementById("header_main").style.height="3.5em"
                    document.getElementById("menu_container").style.top="4px"
                    document.getElementById("sidebar_menu").style.transform="translateY(-1.5em)"
                }
            }   else {
            if (window.location.pathname !== '/motivation' &&
                window.location.pathname !== '/register' &&
                window.location.pathname !== '/login' &&
                window.location.pathname !== '/forgot_pass' &&
                window.location.pathname !== '/logout') {
                    document.getElementById("menu_container").style.top="16px"
                    document.getElementById("header_main").style.height="5em"
                    document.getElementById("sidebar_menu").style.transform="translateY(0)"
                }
            }
        }
    })



    //Search
    const [search, setSearch] = useState(false);
    const [searchBox, setSearchBox] = useState(false);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const commitSearch = async () => {
        setLoading(true)
        try {
            const response = await api({
                method: 'post',
                url: '/search',
                data: {
                    'string': search
                }
            })
            setResults(response.data)
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    //hamburguer
    const [side, setSide] = useState(true)

    useEffect(() => {
        window.innerWidth < 850 && setSide(false)
    },[])

    const toggleSidebar = () => {

        if (window.innerWidth < 850) {
            if (side) { 
                document.getElementById("main_sidebar").style.transform="translateX(-220px)"
                document.getElementById("side-overlay").style.display="none";
                setSide(false)
            }
            else {
                document.getElementById("main_sidebar").style.transform="translateX(0px)"
                document.getElementById("side-overlay").style.display="block";
                setSide(true)
            }

        }

        else {
            if (side) { 
                document.getElementById("main_sidebar").style.transform="translateX(-220px)"
                if (window.location.pathname.includes('explore')) {
                    document.getElementsByClassName("prev")[0].style.transform="translateX(10px)"
                }
                setSide(false)
            }
            else {
                document.getElementById("main_sidebar").style.transform="translateX(0px)"
                if (window.location.pathname.includes('explore')) {
                    document.getElementsByClassName("prev")[0].style.transform="translateX(230px)"
                }
                setSide(true)
            }
        }
    }


    //Buttons dialog
    const [dialog, setDialog] = useState(false);

    //Buttons counter indicator
    const cartCount = useSelector(state => state.shop.cart.length);
    const allNotif = useSelector(state => state.notifications.notifications)

    //Profile button
    const [settings, setSettings] = useState(false)

    //Notif Counter
    const [notifCount, setnotifCount] = useState(allNotif.length);

    //Defaults
    const defaults = useSelector(state => state.defaults.data)

    //Data fetching
    const [data, setData] = useState([])
    const authKey = useSelector(state => state.auth.keys)

    const hitApi = async (key) => {
        setLoading2(true)
        try{
            const response = await api({
                method: 'get',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                }
            })
            dispatch(loadNotif(response.data.notifications))
            setData(response.data)
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
            setLoading2(false)
        }
    }

    useEffect(() => {
      const interval = setInterval(() => {
          authKey.length !== 0 && hitApi(authKey)
      }, 100000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        authKey.length !== 0 && hitApi(authKey)
    }, [])

    useEffect(() => {
        setnotifCount(allNotif.filter((value) => {
            return value.is_read === false
        }).length)
    })

    useEffect(() => {
        search &&
            commitSearch()
    }, [search])

    return (
        <>
            <div onClick={toggleSidebar} id="side-overlay"></div>
            <div className="header-main" id="header_main">
                <div className="menu-container" id="menu_container">
                    <button onClick={toggleSidebar} id="hamburguer"><i className="material-icons">
                        menu
                    </i></button>
                    <div className="sanguetsu-mark">
                        <img className="header-logo" src={"https://ikebana-app-content.s3-sa-east-1.amazonaws.com/static/mainlogo_transparent_notext.png"} alt="logo"/>
                        <p className="logo-title">SANGUETSU</p>
                    </div>
                </div>
                <div className="header-main__content" id="header_title">
                    <div className="header-main__content--title">
                        <div className="title-limiter">
                            <h1 className="page-title" 
                                id="header_title">{Pages[CurrentUrl()]}</h1>
                        </div>
                    </div>
                    <div className="header-main__content--search" id="search_box">
                        <i className="material-icons" id="search_icon">search</i>
                        <DebounceInput onBlur={() => {
                                setTimeout(() => setSearchBox(false), 100)
                            }} onFocus={() => setSearchBox(true)} className="search-box" type="text"
                        onChange={e => setSearch(e.target.value)} debounceTimeout={1000} placeholder="Pesquisar"/>
                        {
                            searchBox &&
                                <SearchBox loading={loading} results={results}/>
                        }
                    </div>
                    <div className="right-wrapper">
                        <div className="shrink">
                            <div className="header-main__content--buttons">
                                <div className="button-wrapper">
                                    <div className={`counter ${ cartCount === 0 ?
                                            'counter-hidden' : '' }`}>
                                        <p>{cartCount}</p></div>
                                    <i onClick={() => setDialog(true)} 
                                        className="material-icons">redeem</i>
                                    {
                                        dialog &&
                                            <Clipper handler={() => setDialog(false)} />
                                    }
                                </div>
                                <div className={`button-wrapper ${authKey.length === 0 ? 'disabled' : ''}`}>
                                    <div className={`counter ${ authKey.length === 0 ? 'counter-disabled' : '' } ${ notifCount === 0 ? 'counter-hidden' : '' }`}>
                                        <p className="notif-counter">{notifCount}</p></div>
                                    <Link onClick={() => {authKey.length !== 0 &&
                                            dispatch(changeUrl('messages'))
                                            }} 
                                        to="/home">
                                        <i className="material-icons">notifications_none</i>
                                    </Link>
                                </div>
                            </div>
                            {
                                loading2 ? 
                                    <div className="lds-dual-ring header-loader"></div>
                                    :
                                <div className="header-main__content--profile">
                                    <button onClick={() => {
                                        authKey.length !== 0 &&
                                            setSettings(true)
                                    }} 
                                        className="profile__btn">
                                        <img title={data.username} className="profile__btn--img" 
                                            src={`${data.length === 0 ? defaults.picture : data.picture}`}
                                            alt="Profile pic"/>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                settings &&
                    <Modal>
                        <SettingsDialog data={{
                            'Perfil': '/home/arrangements',
                            'Configurações': '/account/edit',
                            'Sair': '/logout'
                        }} handler={() => setSettings(false)}/>
                    </Modal>
            }
        </>
    );
}

