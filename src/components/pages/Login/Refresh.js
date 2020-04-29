import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAuth } from 'store/ducks/auth';
import { useHistory } from 'react-router-dom';
import api from 'services/api'

export default function Refresh() {
    const { refresh_key } = useSelector(state => state.auth.keys[0])
    // const history = useHistory();
    // const dispatch = useDispatch();
    // console.log('entrei no refresh')
    
    useEffect( async () => {
        try {
            const response = await api({
                method: 'post',
                url: '/refresh',
                headers: {
                    'Authorization': `Bearer ${refresh_key}`
                }
            })
            const { key } = response.data
            dispatch(refreshAuth({ key, refresh_key }))
            // history.goBack()
        } catch(e) {
            console.log(e)
        } 
    })

    return(
        <h1>oi</h1>
    );
}
