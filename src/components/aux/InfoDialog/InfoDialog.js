import React from 'react';

import './styles.scss';

export default function InfoDialog(props){
    return(
        <div className="dialog-wrapper">
            <div className="error-main scale-in-center">
                <div className="error-main__header">
                    <h1 className="error-main__header--title">Info</h1>
                    <i className="material-icons">feedback</i>
                </div>
                <div className="error-main__content">
                    <p className="error-main__content--desc">
                        {
                            props.value 
                        }
                    </p>
                </div>
                <div className="error-main__footer">
                    <button onClick={props.handler} className="error-main__footer--btn">
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}
