import React from 'react';

import './styles.scss';

export default function WarningDialog(props){
    return(
        <div className="dialog-wrapper">
            <div className="error-main scale-in-center">
                <div className="error-main__header">
                    <h1 className="error-main__header--title">Atenção</h1>
                    <i className="material-icons" style={{color: 'tomato'}}>warning</i>
                </div>
                <div className="error-main__content">
                    <p className="error-main__content--desc">
                        {
                            props.value 
                        }
                    </p>
                </div>
                <div className="error-main__footer warn">
                    <button onClick={props.accept} style={{color: 'red', marginLeft: '1.5em'}} className="error-main__footer--btn">
                        Continuar
                    </button>
                    <button onClick={props.handler} className="error-main__footer--btn">
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}
