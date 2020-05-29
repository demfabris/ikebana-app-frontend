import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import api from 'services/api';

import './styles.scss';


export default function Admin() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rendered, setRendered] = useState(false);

    const history = useHistory();
    const authKey = useSelector(state => state.auth.keys)


    const hitApi = async (event, key=authKey) => {
        setLoading(true)
        try{
            const response = await api({
                method: 'post',
                url: '/admin',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
                data: {
                    type: event.target.name,
                    target: event.target.value
                }
            })
            console.log(response.data)
        } catch(e){
            alert("Algum erro ocorreu, contate o desenvolvedor")
        } finally {
            setLoading(false);
            window.location.reload()
        }
    }

    const firstApiHit = async (key=authKey) => {
        try{
            const response = await api({
                method: 'get',
                url: '/admin',
                headers: {
                    'Authorization': `Bearer ${key[0].key}`
                },
            })
            setData(response.data)
        } catch(e){
            history.goBack()
        } finally {
            setRendered(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        !authKey && history.goBack()
        firstApiHit()
    }, [])

    useEffect(() => {
        document.getElementsByTagName("body")[0].style.background="rgba(0, 0, 0, 0.8)"

        return () => {
            document.getElementsByTagName("body")[0].style.background="#F8F9FC"
        }
    })

    window.onload = () => {
        window.dispatchEvent(new Event("resize"))
    }

    useEffect(() => {
        window.onresize = () => {
            if (window.innerWidth < 860) {
                document.getElementById("main-content").style.overflowX="scroll";
                document.getElementsByTagName("body")[0].style.overflowX="hidden";
            } else {
                document.getElementById("main-content").style.overflowX="auto";
            }
        }
    }, [])

    return(
        <>
        {
            rendered &&
                <section className="admin">
                    <div className="tables">
                        <header className="admin-header">
                            <h1 className="admin-header__title">
                                Usuários aguardando aprovação</h1>
                        </header>
                        <table className="tables-view">
                            <thead>
                                <tr className="tables-view__header">
                                    <th>Nome do usuário</th>
                                    <th title="Data que pediu a solicitação">Data*</th>
                                    <th>Cidade</th>
                                    <th>Telefone</th>
                                    <th>Aprovar</th>
                                    <th>Recusar</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    loading ?
                                        <div className="sizer">
                                            <div className="lds-ellipsis"><div></div>
                                                <div></div><div></div><div></div></div></div>
                                                :
                                        data.wants_partner.length === 0 ?
                                            <tr className="no_solic"><td>Sem solicitações</td></tr>
                                            :
                                        data.wants_partner.map( (el, key) => (
                                            <tr key={key} className="tables-view__body">
                                                <td>{el.fullname}</td>
                                                <td>
                                                    {new Date(el.req_partner_on).getDate()}/
                                                    {new Date(el.req_partner_on).getMonth()}/
                                                    {new Date(el.req_partner_on).getFullYear()}
                                                </td>
                                                <td>{el.city}</td>
                                                <td>{el.tel}</td>
                                                <td>
                                                    <button name="acc_user" 
                                                        value={el.id} onClick={e => hitApi(e)} 
                                                        className="tables__accept">Aceitar</button>
                                                </td>
                                                <td>
                                                    <button 
                                                        className="tables__accept 
                                                        tables__accept--reject">Recusar</button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="tables">
                        <header className="admin-header">
                            <h1 className="admin-header__title">
                                Todos os usuários</h1>
                        </header>
                        <table className="tables-view">
                            <thead>
                                <tr className="tables-view__header">
                                    <th>Nome do usuário</th>
                                    <th>Cidade</th>
                                    <th>Telefone</th>
                                    <th>Status</th>
                                    <th>Remover</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    loading ?
                                        <div className="sizer">
                                            <div className="lds-ellipsis"><div></div>
                                                <div></div><div></div><div></div></div></div>
                                                :
                                        data.users.map( (el, key) => (
                                            <tr key={key} className="tables-view__body">
                                                <td>{el.fullname}</td>
                                                <td>{el.city}</td>
                                                <td>{el.tel}</td>
                                                <td>{el.isPartner ? 'Membro' : 'Normal'}</td>
                                                <td>
                                                    {
                                                        el.id !== 1 &&
                                                            <button onClick={e => hitApi(e)} value={el.id}
                                                                name="del_user" className="tables__accept
                                                                tables__accept--reject">Remover</button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="tables">
                        <header className="admin-header">
                            <h1 className="admin-header__title">
                                Todos os projetos</h1>
                        </header>
                        <table className="tables-view">
                            <thead>
                                <tr className="tables-view__header">
                                    <th>Nome do projeto</th>
                                    <th>Autor</th>
                                    <th>Tipo</th>
                                    <th>Curtidas</th>
                                    <th>Remover</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?
                                        <div className="sizer">
                                            <div className="lds-ellipsis"><div></div>
                                                <div></div><div></div><div></div></div></div>
                                                :
                                        data.all_projects.map((el, key) => (
                                            <tr key={key} className="tables-view__body">
                                                <td>{el.name}</td>
                                                <td>{el.autor}</td>
                                                <td>{el.type === 
                                                        'arrangement' ? 'Arranjo' : 'Aula'}</td>
                                                <td>{el.likes}</td>
                                                <td>
                                                    <button onClick={e => hitApi(e)} name="del_proj"
                                                        value={el.project_id} className="tables__accept 
                                                        tables__accept--reject">Remover</button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <button onClick={() => history.goBack()} className="app-btn btn-back">Voltar</button>
                </section>
            }
        </>
    );
}
