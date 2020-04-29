import React from 'react';

import './styles.scss';

export default function EditArrangementDialog({handler}) {

    return(
        <div className="edit-dialog">
            <button onClick={handler} className="edit-dialog--close"><i className="material-icons">clear</i></button>
            <div className="edit-dialog__content">
                <div className="edit-dialog__content--header">
                    <h2>Editar Arranjo</h2>
                </div>
                <div className="edit-dialog__content wrapper">
                    <div className="new-dialog__content--left">
                        <h3>Editar Nome</h3>
                        <input type="text" className="name-input"/>
                        <h3>Descrição</h3>
                        <textarea className="desc-input"
                            placeholder="Editar descrição/instrução do arranjo..."/>
                    </div>
                    <div className="edit-dialog__content--right">
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
                                <p>Insira um link do YouTube:</p>
                                <input type="text" className="link-input"/>
                                <span>*No momento só é suportado videos hospedados no YouTube.</span>
                            </div>
                            <div className="video-section--right">
                                <div className="video-prev">
                                    <iframe width="223" height="128" 
                                        src="https://www.youtube.com/embed/rxf5WIBSYT0?controls=0" 
                                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="btn-wrapper">
                        <button className="edit-btn edit-btn-del">Excluir</button>
                        <button className="edit-btn">Finalizar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
