import React from 'react';
import { useSelector } from 'react-redux';

import './styles.scss';

import CheckoutCartElement from '../../list_elements/CartElement/CheckoutCartElement';

export default function CheckoutDialog({handler}) {

    const cart = useSelector(state => state.shop.cart);

    return(
        <div className="checkout-dialog">
            <button onClick={handler} className="checkout-dialog--close"><i className="material-icons">clear</i></button>
            <div className="checkout-dialog__content">
                <div className="checkout-dialog__content--header">
                    <h2 className="checkout-title">Pedido</h2>
                </div>
                <div className="checkout-dialog__content wrapper">
                    <div className="wrapper-left">
                        <div className="wrapper-left__about">
                            <div className="wrapper-left__about--header">
                                <h3 className="checkout-about">
                                    Sobre solicitações</h3>
                                <p className="checkout-text">Você está realizando uma solicitação a um membro da plataforma. Esta solicitação tem caráter caritativo e não visa lucros. O solicitado poderá <b>recusar</b> o pedido caso não possa atendê-lo.</p>
                            </div>
                            <div className="wrapper-left__about--donation">
                                <h3 className="donation-title">Doações</h3>
                                <p className="donation-text">Caso o pedido seja aprovado considere fazer um donativo para cobrir custos materiais do arranjo. Poderá ser entregue no local de retirada ou diretamente do website.</p>
                            </div>
                            <div className="wrapper-left__about--msg">
                                <div className="msg-wrapper">
                                    <h3 className="msg-title">Deixe uma mensagem</h3>
                                    <textarea id="msg-to-autor" name="msg" placeholder="Escreva uma breve saudação explicando a finalidade e a motivo da solicitação."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="v-spacer"></div>
                    <div className="wrapper-right">
                        <div className="wrapper-right__orders">
                            <h3 className="orders-title">Selecionados</h3>
                            <div className="wrapper-right__orders--list">
                                <div className="shadow-overlay"></div>
                                {
                                    cart.map((el) => (
                                        <CheckoutCartElement key={el.id}
                                            name={el.name} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button className="dialog-btn">Concluir</button>
                </div>
            </div>
        </div>
    );
}
