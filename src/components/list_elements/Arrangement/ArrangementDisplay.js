import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ArrangementDialog from '../../Dialog/components/ArrangementDialog/ArrangementDialog';
import Modal from '../../aux/Modal.js';

import './styles.scss';

export default function ArrangementDisplay(el, key) {
    const [dialog, setDialog] = useState('');
    const [likeCount, setLikeCount] = useState(el.likes);

    const options = {
        'visualize': ArrangementDialog,
    }
    const ActiveDialog = options[dialog];

    let createdOn = Date.parse(el.created_on)
    createdOn = new Date(createdOn)

    return(
        <>
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
                                                <button title="Possui Video" 
                                                    className="element-overlay__title--btn has-video">
                                                    <i className="material-icons">videocam</i>
                                                </button>
                                        }
                                        <button onClick={() => setDialog('visualize')} 
                                            title="Visualizar" 
                                            className="element-overlay__title--btn">
                                            <i
                                                className="material-icons">launch</i>
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
            {
                dialog &&
                    <Modal>
                        <ActiveDialog handler={() => setDialog('')} el={el} likeCount={likeCount} 
                            likeHandler={() => setLikeCount(likeCount + 1)} />
                    </Modal>
            }
        </>
    );
}
