import React from 'react';

import './styles.scss';

export default function EditLessonDialog({handler}) {

    return(
        <div className="new-dialog">
            <button onClick={handler} className="new-dialog--close"><i className="material-icons">clear</i></button>
            <div className="new-dialog__content">
                <div className="new-dialog__content--header">
                    <h2>Editar Aula</h2>
                </div>
                <div className="new-dialog__content wrapper">
                    <div className="new-dialog__content--left">
                        <h3>Título*</h3>
                        <input type="text" className="name-input"/>
                        <h3>Texto*</h3>
                        <textarea className="desc-input" placeholder="Conteúdo da aula..."/>
                    </div>
                    <div className="new-dialog__content--right">
                        <h3>Fotos</h3>
                        <div className="input-wrapper">
                            <div className="preview">
                                <input type="file" id="ph1" className="photo-input"/>
                                <label for="ph1"><i className="material-icons">add</i></label>
                            </div>
                            <div className="preview">
                                <input type="file" id="ph1" className="photo-input"/>
                                <label for="ph1"><i className="material-icons">add</i></label>
                            </div>
                            <div className="preview">
                                <input type="file" id="ph1" className="photo-input"/>
                                <label for="ph1"><i className="material-icons">add</i></label>
                            </div>
                        </div>
                        <h3>Videoaula</h3>
                        <div className="video-section">
                            <div className="video-section--left">
                                <p>Insira um link do YouTube:**</p>
                                <input type="text" className="link-input"/>
                                <span>*Campo obrigatório.</span>
                                <span>**No momento só é suportado videos hospedados no YouTube.</span>
                            </div>
                            <div className="video-section--right">
                                <div className="video-prev"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button>Finalizar</button>
                </div>
            </div>
        </div>
    );
}
