import React from 'react';

import './styles.scss';

export default function ErrorDialog(props){
    return(
        <div className="dialog-wrapper">
            <div className="error-main scale-in-center">
                <div className="error-main__header">
                    <h1 className="error-main__header--title">Erro</h1>
                    <i className="material-icons">error_outline</i>
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
