import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Modal from '../../aux/Modal.js';

import './styles.scss';

export default function LessonDisplay(el) {
    const history = useHistory();

    let createdOn = Date.parse(el.created_on)
    createdOn = new Date(createdOn)

    return(
            <div className="arr-element">
                {
                    Object.values(el.pictures).map((link, key) => (
                        <div key={key} className="arr-element__layer">
                            <div className="arr-element__layer--container">
                                <img className="arr-element__layer--container--img" src={link} 
                                    alt="Layer" />
                                <div className="element-overlay">
                                    <div className="element-overlay__title">
                                        <h1 className="element-overlay__title--text">{el.name}</h1>
                                        {
                                            el.video &&
                                                <button title="Assistir Videoaula" 
                                                    className="element-overlay__title--btn has-video">
                                                    <i className="material-icons">videocam</i>
                                                </button>
                                        }
                                        <button title="Visualizar" onClick={() => history.push(`/lesson/${el.project_id}`)}
                                            className="element-overlay__title--btn">
                                            <i className="material-icons">photo_library</i>
                                        </button>
                                    </div>
                                    <div className="element-overlay__desc">
                                        <div className="element-overlay__desc--likes">
                                            <p className="element-overlay__desc--likes--text">
                                                {el.likes}
                                            </p>
                                            <i className="material-icons">favorite</i>
                                        </div>
                                        <div className="element-overlay__desc--footer">
                                            <p className="element-overlay__desc--footer--date">
                                                {' ' + createdOn.getDate()
                                                }/{1 + createdOn.getMonth()
                                                }/{createdOn.getFullYear()}
                                            </p>

                                            <Link to={{
                                                pathname: "/account/edit_project",
                                                state: {...el}
                                                }}>
                                            <button title="Editar" className="element-overlay__desc--footer--btn">
                                                <i className="material-icons">build</i>
                                            </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
    );
}
