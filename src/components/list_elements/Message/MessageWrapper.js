import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MessageDisplay from './MessageDisplay';
import EmptyMessages from '../Empty/EmptyMessages';

import './styles.scss';

export default function MessageWrapper() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false)
    const notif_data = useSelector(state => state.notifications.notifications);

    return(
        <div className={`msg-wrapper ${ notif_data.length === 0 ? 'wrapper-center' : '' }`}>
            {
                notif_data.length === 0 ? 
                    <EmptyMessages />
                    :
                notif_data.map((el, key) => <MessageDisplay key={key} {...el} />)
            }
        </div>
    );
}
