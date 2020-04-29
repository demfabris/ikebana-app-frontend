import React, { useEffect } from 'react';

import './styles.scss';

export default function Dialog({ children, handler}) {
    const header = document.getElementById("header_main")

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.overflowY="hidden"
        if (header.offsetHeight < 80) {
            Array.from(document.getElementsByClassName("dialog-portrait")).map((el) => (
                el.classList.add("padded")
            ))
        }
        if (window.innerWidth < 750) {
                header.style.boxShadow = "none"
                header.style.borderBottom = "1px solid #dbdbdb"
        }

        return () => {
            if (Array.from(document.getElementsByClassName("dialog-portrait")).length === 1) {
                document.getElementsByTagName('body')[0].style.overflowY="auto"
            }

            if (window.innerWidth < 750 && Array.from(document.getElementsByClassName("dialog-portrait")).length === 1) {
                header.style.boxShadow = "0 0.15rem 0.35rem 0 rgba(58, 59, 69, .20)"
                header.style.borderBottom = "none"
            }
        }
    },[])

    return(
        <>
            <div className="dialog-landscape">
                <div className="dialog-landscape-close" onClick={handler}>
                    <button className="dialog-landscape-close__btn">
                        <i className="material-icons">close</i>
                    </button>
                </div>
                <div className="dialog-landscape-main scale-in-center">
                    {children}
                </div>
            </div>
            <div className="dialog-portrait" id="dialog_portrait">
                <div className="dialog-portrait-close">
                    <button className="dialog-portrait-close__btn" onClick={handler}>
                        <div className="btn-wrapper">
                            <p className="btn-text">Voltar</p>
                            <i className="material-icons">arrow_back</i>
                        </div>
                    </button>
                </div>
                <div className="dialog-portrait-main scale-in-center">
                    {children}
                </div>
            </div>
        </>
    );
}
