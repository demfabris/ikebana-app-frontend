import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import ArrangementDialog from '../../Dialog/components/ArrangementDialog/ArrangementDialog';
import Modal from '../../aux/Modal';

import './styles.scss';

export default function ArrangementBig(el) {
    const [dialog, setDialog] = useState(false);
    const [likeCount, setLikeCount] = useState(el.likes);
    const history = useHistory();

    return (
        <>
            <div onClick={() => {
                    setDialog(true)
                    history.push(`/explore/${el.project_id}`)
                }} 
                className="card-main" id="card_main">
                <img className="arr-img" src={el.pictures.file1}
                    alt="Planta" />
                <div className="card-main__footer">
                    <img src={el.autor_pic}/>
                    <div className="card-main__footer--info">
                        <p className="card-name">{el.name}</p>
                        <p className="card-desc">{el.avaiable_on}</p>
                    </div>
                    <div className="card-main__footer--likes">
                        <i className="material-icons">favorite</i>
                        <span className="like-counter">{likeCount}</span>
                    </div>
                </div>
            </div>
            {
                dialog &&
                    <Route path={`/explore/${el.project_id}`}>
                        <Modal>
                            <ArrangementDialog handler={() => {
                                setDialog(false)
                                history.goBack()
                            }} el={el} likeCount={likeCount} likeHandler={() => setLikeCount(likeCount + 1)}/>
                        </Modal>
                    </Route>
            }
        </>
    );
}

