import ReactDOM from 'react-dom';

export default function Modal(props) {

    const modalRoot = document.getElementById('modal-root');

    return (
        ReactDOM.createPortal(
            props.children,
            modalRoot
        )
    );
}
