import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from 'services/api'
import { useForm } from 'react-hook-form';

import Modal from '../../../../aux/Modal';
import ErrorDialog from '../../../../aux/ErrorDialog/ErrorDialog';
import InfoDialog from '../../../../aux/InfoDialog/InfoDialog';


import './styles.scss';

export default function NewProject() {
    //toggle allow button only if arrangement is selected
    const [allow, setAllow] = useState(false);

    //forms
    const { register, handleSubmit, errors, watch } = useForm();

    //store select
    const authKey = useSelector(state => state.auth.keys)
    const userData = useSelector(state => state.account.userData[0])

    //dialog
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);

    //feeding data
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false);

    //picture inputs
    const [file1, setFile1] = useState([]);
    const [file2, setFile2] = useState([]);
    const [file3, setFile3] = useState([]);

    const handleInputChange = (e) => {
        const inputNum = e.target.name.split('file')[1]
        const file = e.target.files[0]

        if (!file) {
            setError('Selecione alguma foto')
            return void 0
        }

        if (((file.size/1024)/1024).toFixed() > 5) {
            setError('Selecione um arquivo menor que 5MB')
            return void 0
        }

        if (!(['image/png', 'image/jpeg'].includes(file.type))){
            setError('Formato inválido, selecione apenas imagens JPG ou PNG')
            return void 0
        }

        const preview = URL.createObjectURL(file)

        switch(inputNum) {
            case '1': {
                setFile1({ file, preview})
                break;
            }
            case '2': {
                setFile2({ file, preview})
                break;
            }
            case '3': {
                setFile3({ file, preview})
                break;
            }
            default: {
                return void 0
            }
        }
    }

    const onSubmit = async ({ 
        project_type,
        project_title,
        project_desc,
        project_allow,
        project_video }) => {
            setLoading(true)
            const formData = new FormData();
            try {
                formData.append('project_type', project_type)
                formData.append('project_title', project_title)
                formData.append('project_desc', project_desc)
                formData.append('project_video', project_video)
                formData.append('project_allow', project_allow)
                formData.append('file1', file1.file)
                formData.append('file2', file2.file)
                formData.append('file3', file3.file)
                const response = await api({
                    method: 'post',
                    url: '/projects',
                    headers: {
                        'Authorization': `Bearer ${authKey[0].key}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    data: formData,
                })
                response.data && setInfo('Projeto criado com sucesso.')
            } catch(e) {
                console.log(e)
                setError('Um projeto com este nome já existe')
            } finally {
                setLoading(false)
            }
        }

    useEffect(() => {
        setFile1({preview: ''})
        setFile2({preview: ''})
        setFile3({preview: ''})
    },[])

    return(
        <>
            <div className="new">
                <div className="new__header">
                    <p className="password__header--title">Criar um novo projeto.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="new__inputs">
                        <p className="new__inputs--desc">Informações do projeto</p>
                        <div className="new__inputs--container acc-field">
                            <label htmlFor="project-name"
                                className="input-label acc-field__title">
                                Tipo</label>
                            {errors.project_type && <div title="Você deve escolher um tipo" 
                            className="validation-overlay-new">
                            <i className="material-icons">error_outline</i></div>}

                            <div className="project-type">
                                <label className="project-type__label" onClick={() => setAllow(true)}
                                    htmlFor="arrangement">Arranjo
                                </label>
                                <input className="project-type__input" onClick={() => setAllow(true)} 
                                    value="arrangement" type="radio" id="arrangement" name="project_type"
                                    ref={register({required: true})}/>
                                <label className="project-type__label" onClick={() => setAllow(false)}
                                    htmlFor="lesson">Aula
                                </label>
                                <input className="project-type__input" onClick={() => setAllow(false)} 
                                    value="lesson" type="radio" id="lesson" ref={register({required: true})} 
                                    name="project_type" />
                            </div>
                        </div>
                        <div className="new__inputs--container acc-field">
                            <label htmlFor="project-name"
                                className="input-label acc-field__title">
                                Nome do Projeto</label>
                            <input type="text" ref={register({required: true, 
                                minLength: 6, maxLength: 35})} 
                                className="account-input" name="project_title"
                                id="project-name"/>
                                {errors.project_title && <div title="Mínimo de 6 caracteres e Máximo 35" 
                                className="validation-overlay-new">
                                <i className="material-icons">error_outline</i></div>}
                        </div>
                        <div className="new__inputs--container acc-field">
                            <label htmlFor="project-desc"
                                className="input-label acc-field__title">
                                Descrição</label>
                            <textarea id="project-desc" 
                                className="account-input" ref={register({required: true, minLength: 20})}
                                placeholder="Texto descritivo ou explicativo" 
                                name="project_desc">
                            </textarea>
                                {errors.project_desc && <div title="É preciso incluir uma descrição de no mínimo 20 caractéres"
                                className="validation-overlay-new">
                                <i className="material-icons">error_outline</i></div>}
                        </div>
                        <div className="new__inputs--container acc-field">
                            <label style={{marginTop: "2px"}} htmlFor="project-name"
                                className="input-label acc-field__title">
                                Solicitações
                            </label>
                            <div className={`project-type ${!allow && 'hidden-allow'}`}>
                                <label className="project-type__label" 
                                    htmlFor="project_allow">Permitir?
                                </label>
                                <input className="project-type__input" 
                                    id="project_allow" type="checkbox" 
                                    name="project_allow" ref={register()}/>
                                <i title="Permitir que outras pessoas solicitem este arranjo." className="material-icons help-allow">help</i>
                            </div>
                        </div>
                        <div className="new__inputs--container acc-field">
                            <label className="input-label acc-field__title">
                                Fotos do Projeto</label>
                            <div className="picture-wrapper">
                                <div className="picture-container">
                                    <button type="button" className="picture-container__btn">
                                        <div className=
                                            {`close-overlay ${ !file1.preview 
                                            ? 'inactive' : '' }`}
                                            onClick={() => setFile1([])}>
                                        <i className="material-icons">close</i></div>
                                        <img src={file1.preview} 
                                            className="img-preview" alt="" />
                                        <i className="material-icons">add</i>
                                        <input type="file" ref={register()} 
                                            onChange={handleInputChange}
                                            className="picture-input" 
                                            name="file1" />
                                    </button>
                                </div>
                                <div className="picture-container">
                                    <button type="button" className="picture-container__btn">
                                        <div className=
                                            {`close-overlay ${ !file2.preview 
                                            ? 'inactive' : '' }`}
                                            onClick={() => setFile2([])}>
                                        <i className="material-icons">close</i></div>
                                        <img src={file2.preview} 
                                            className="img-preview" alt="" />
                                        <i className="material-icons">add</i>
                                        <input type="file" ref={register()} 
                                            onChange={handleInputChange}
                                            className="picture-input" 
                                            name="file2" />
                                    </button>
                                </div>
                                <div className="picture-container">
                                    <button type="button" className="picture-container__btn">
                                        <div className=
                                            {`close-overlay ${ !file3.preview 
                                            ? 'inactive' : '' }`}
                                            onClick={() => setFile3([])}>
                                        <i className="material-icons">close</i></div>
                                        <img src={file3.preview} 
                                            className="img-preview" alt="" />
                                        <i className="material-icons">add</i>
                                        <input type="file" ref={register()} 
                                            onChange={handleInputChange}
                                            className="picture-input" 
                                            name="file3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="new__inputs--desc">Videoaula</p>
                        <div className="new__inputs--container acc-field">
                            <label htmlFor="project-video"
                                className="input-label acc-field__title">
                                Link do Video</label>
                            <input type="text" className="account-input" 
                                id="project-video" ref={register()} name="project_video"
                                placeholder="Somente links do YouTube"/>
                        </div>
                        <button className="app-btn btn-filled">
                            {
                                loading === true ? <div className="sizer">
                                    <div class="lds-ellipsis"><div></div>
                                        <div></div><div></div><div></div></div>
                                </div>
                                :
                                <p>Concluir</p>
                            }
                        </button>
                    </div>
                </form>
            </div>
            {
                error &&
                    <Modal>
                        <ErrorDialog value={error} handler={() =>{
                            setError(false)
                        } }/>
                    </Modal>
            }
            {
                info &&
                    <Modal>
                        <InfoDialog value={info} handler={() => {
                            setInfo(false)
                            window.location.pathname = '/home'
                        }}/>
                    </Modal>
            }
        </>
    );
}
